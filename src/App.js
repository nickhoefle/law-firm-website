import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminPortal from './components/AdminPortal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/admin" element={<AdminPortal />} />
            </Routes>
        </Router>
    );
}

export default App;
