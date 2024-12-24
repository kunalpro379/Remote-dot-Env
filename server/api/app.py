# import os
# import json
# import logging
# from flask import Flask, Response, request, jsonify, render_template
# import io
# import awsgi

# # Configure logging
# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

# try:
#     from werkzeug.wsgi import FileWrapper
# except ImportError:
#     from werkzeug import FileWrapper

# # Initialize Flask app
# app = Flask(__name__)

# # Global state dictionary
# STATE = {}
# @app.route('/test_io', methods=['GET'])
# def test_io():
#     logger.info('Testing io.BytesIO')
#     try:
#         # Create a BytesIO object and write some data to it
#         data = io.BytesIO()
#         data.write(b'This is a test string for io.BytesIO')
#         data.seek(0)  # Go back to the beginning of the BytesIO object
        
#         # Return the data as a response
#         return Response(data, mimetype='text/plain')
#     except Exception as e:
#         logger.error(f'Error in test_io route: {str(e)}')
#         return jsonify({'error': str(e)}), 500


# # Client routes
# @app.route('/', methods=['GET'])
# def root():
#     logger.info('Handling root request')
#     try:
#         return render_template('./index.html')
#     except Exception as e:
#         logger.error(f'Error in root route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# @app.route('/rd', methods=['POST'])
# def rd():
#     logger.info('Handling rd request')
#     try:
#         req = request.get_json()
#         logger.info(f'Received request data: {req}')
        
#         if not req or '_key' not in req:
#             logger.error('Invalid request format - missing _key')
#             return jsonify({'error': 'Invalid request format'}), 400
            
#         key = req['_key']
#         logger.info(f'Processing request for key: {key}')
        
#         if key not in STATE:
#             logger.error(f'Session not found for key: {key}')
#             return jsonify({'error': 'Session not found'}), 404
            
#         if req.get('filename') == STATE[key]['filename']:
#             attachment = io.BytesIO(b'')
#         else:
#             attachment = io.BytesIO(STATE[key]['im'])
        
#         w = FileWrapper(attachment)
#         resp = Response(w, mimetype='text/plain', direct_passthrough=True)
#         resp.headers['filename'] = STATE[key]['filename']
        
#         return resp
#     except Exception as e:
#         logger.error(f'Error in rd route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# @app.route('/event_post', methods=['POST'])
# def event_post():
#     logger.info('Handling event_post request')
#     try:
#         req = request.get_json()
#         logger.info(f'Received event data: {req}')
        
#         if not req or '_key' not in req:
#             logger.error('Invalid request format - missing _key')
#             return jsonify({'error': 'Invalid request format'}), 400
            
#         key = req['_key']
        
#         if key not in STATE:
#             logger.error(f'Session not found for key: {key}')
#             return jsonify({'error': 'Session not found'}), 404
        
#         STATE[key]['events'].append(req)
#         logger.info(f'Successfully added event for key: {key}')
#         return jsonify({'ok': True})
#     except Exception as e:
#         logger.error(f'Error in event_post route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# @app.route('/new_session', methods=['POST'])
# def new_session():
#     logger.info('Handling new_session request')
#     try:
#         req = request.get_json()
#         logger.info(f'Received session data: {req}')
        
#         if not req or '_key' not in req:
#             logger.error('Invalid request format - missing _key')
#             return jsonify({'error': 'Invalid request format'}), 400
            
#         key = req['_key']
#         STATE[key] = {
#             'im': b'',
#             'filename': 'none.png',
#             'events': []
#         }
        
#         logger.info(f'Successfully created new session for key: {key}')
#         return jsonify({'ok': True})
#     except Exception as e:
#         logger.error(f'Error in new_session route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# @app.route('/capture_post', methods=['POST'])
# def capture_post():
#     logger.info('Handling capture_post request')
#     try:
#         if not request.files:
#             logger.error('No file uploaded')
#             return jsonify({'error': 'No file uploaded'}), 400
            
#         filename = list(request.files.keys())[0]
#         key = filename.split('_')[1]
#         logger.info(f'Processing file: {filename} for key: {key}')
        
#         if key not in STATE:
#             logger.error(f'Session not found for key: {key}')
#             return jsonify({'error': 'Session not found'}), 404
            
#         image_data = io.BytesIO(request.files[filename].read())
#         STATE[key]['im'] = image_data.getvalue()
#         STATE[key]['filename'] = filename
        
#         logger.info(f'Successfully captured image for key: {key}')
#         return jsonify({'ok': True})
#     except Exception as e:
#         logger.error(f'Error in capture_post route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# @app.route('/events_get', methods=['POST'])
# def events_get():
#     logger.info('Handling events_get request')
#     try:
#         req = request.get_json()
#         logger.info(f'Received request data: {req}')
        
#         if not req or '_key' not in req:
#             logger.error('Invalid request format - missing _key')
#             return jsonify({'error': 'Invalid request format'}), 400
            
#         key = req['_key']
        
#         if key not in STATE:
#             logger.error(f'Session not found for key: {key}')
#             return jsonify({'error': 'Session not found'}), 404
            
#         events_to_execute = STATE[key]['events'].copy()
#         STATE[key]['events'] = []
#         logger.info(f'Successfully retrieved events for key: {key}')
#         return jsonify({'events': events_to_execute})
#     except Exception as e:
#         logger.error(f'Error in events_get route: {str(e)}')
#         return jsonify({'error': str(e)}), 500

# def lambda_handler(event, context):
#     logger.info('Lambda handler started')
#     logger.info(f'Event: {json.dumps(event)}')
    
#     try:
#         if not event:
#             logger.error('Empty event received')
#             return {
#                 'statusCode': 400,
#                 'body': json.dumps({'error': 'Empty event'})
#             }

#         # Handle Function URL events
#         if 'requestContext' in event and 'http' in event['requestContext']:
#             logger.info('Processing Function URL event')
#             converted_event = {
#                 'httpMethod': event['requestContext']['http']['method'],
#                 'path': event['rawPath'],
#                 'queryStringParameters': event.get('queryStringParameters', {}),  # Use empty dict as default
#                 'headers': event.get('headers', {}),
#                 'body': event.get('body', ''),
#                 'isBase64Encoded': event.get('isBase64Encoded', False)
#             }
#             logger.info(f'Converted event: {json.dumps(converted_event)}')
#             return awsgi.response(app, converted_event, context, base64_content_types={"image/png"})
        
#         # Handle API Gateway events
#         elif 'httpMethod' in event:
#             logger.info('Processing API Gateway event')
#             return awsgi.response(app, event, context, base64_content_types={"image/png"})
        
#         logger.error('Unsupported event type')
#         return {
#             'statusCode': 400,
#             'body': json.dumps({'error': 'Unsupported event type'})
#         }
#     except Exception as e:
#         logger.error(f'Error in lambda_handler: {str(e)}')
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'error': str(e)})
#         }


# # For local testing
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

    