import { useEffect, useCallback, useRef } from 'react';

const RECONNECT_DELAY = 30000000; // 3 seconds
const KEEP_ALIVE_INTERVAL = 10000; // 15 seconds

const useSubscriptionReceiver = (query, variables, onUpdate, onConnectionChange) => {
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const keepAliveIntervalRef = useRef(null);
  const isConnectedRef = useRef(false);

  const headers = {
    host: "rtgr2dep2ngtjf3mmrpdbgwhba.appsync-api.ap-south-1.amazonaws.com",
    "x-api-key": "da2-exv4ybptwbaelenl6pp7ifp5ki"
  };

  const initializeWebSocket = useCallback(() => {
    try {
      const encodedHeader = btoa(JSON.stringify(headers));
      const payload = "e30="; // Base64 for {}
      const wssUrl = "wss://rtgr2dep2ngtjf3mmrpdbgwhba.appsync-realtime-api.ap-south-1.amazonaws.com/graphql";
      const connectionUrl = `${wssUrl}?header=${encodedHeader}&payload=${payload}`;
      console.log("Connecting to:", connectionUrl);

      // Close existing connection if any
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      wsRef.current = new WebSocket(connectionUrl, "graphql-ws");

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
        isConnectedRef.current = true;
        onConnectionChange?.(true);

        wsRef.current.send(JSON.stringify({
          type: "connection_init",
          payload: {}
        }));

        keepAliveIntervalRef.current = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "ka" }));
          }
        }, KEEP_ALIVE_INTERVAL);
      };

      wsRef.current.onmessage = (event) => {
        console.log("Message received:", event.data);
        try {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case 'connection_ack':
              const subscriptionMessage = {
                id: "1",
                type: "start",
                payload: {
                  data: JSON.stringify({
                    query,
                    variables,
                  }),
                  extensions: {
                    authorization: {
                      "x-api-key": headers["x-api-key"],
                      "host": headers["host"]
                    }
                  }
                }
              };
              console.log("Sending subscription message:", subscriptionMessage);
              wsRef.current.send(JSON.stringify(subscriptionMessage));
              break;

            case 'data':
              if (message.id === '1' && message.payload?.data) {
                onUpdate(message.payload.data);
              }
              break;

            case 'error':
              console.error('Subscription error:', message.payload);
              handleDisconnect();
              break;

            default:
              console.log('Unhandled message type:', message.type);
          }
        } catch (error) {
          console.error('Error processing message:', error);
          handleDisconnect();
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        handleDisconnect();
      };

      wsRef.current.onclose = (event) => {
        console.log(`WebSocket closed: ${event.code} ${event.reason}`);
        handleDisconnect();
      };
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
      handleDisconnect();
    }
  }, [query, variables, onUpdate, onConnectionChange]);

  const handleDisconnect = useCallback(() => {
    if (isConnectedRef.current) {
      isConnectedRef.current = false;
      onConnectionChange?.(false);
    }

    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }

    if (!reconnectTimeoutRef.current) {
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectTimeoutRef.current = null;
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          initializeWebSocket();
        }
      }, RECONNECT_DELAY);
    }
  }, [initializeWebSocket, onConnectionChange]);

  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
        keepAliveIntervalRef.current = null;
      }

      isConnectedRef.current = false;
    };
  }, [initializeWebSocket]);

  return {
    isConnected: isConnectedRef.current,
    reconnect: initializeWebSocket
  };
};

export default useSubscriptionReceiver;
