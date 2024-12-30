import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RemoteDesktopView from '../views/RemoteDesktopView';
import ControllerView from '../views/ControllerView';
import ProtectedRoute from '../../../RemotedotEnv/routes/ProtectedRoute';

const RemoteDesktopRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RemoteDesktopView />} />
      <Route path="/:username/:sessionId" element={<ControllerView />} />
    </Routes>
  );
};

export default RemoteDesktopRoutes;
