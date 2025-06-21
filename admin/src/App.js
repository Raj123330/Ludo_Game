import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginForm/LoginForm';
import DashBoardScreen from './Pages/Dashboardscreen/DashboardScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<DashBoardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
