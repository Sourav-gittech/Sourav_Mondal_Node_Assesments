import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Layout from '../layout/Layout'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

const Routing = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default Routing