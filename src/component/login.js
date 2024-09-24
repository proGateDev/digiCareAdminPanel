import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/logoutAuth';

import { useRouter } from 'next/router'; 

const Login = () => {
    useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleEmailLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.post('http://192.168.0.172:8000//user/auth/signup', {
            email,
            password
        })
        .then((response) => {
            sessionStorage.setItem('userToken', response?.data?.token);

            Swal.fire({
                title: "Login Successful!",
                text: response?.data?.message,
                icon: "success"
            });
            router.push('/admin/dashboard');
        })
        .catch((err) => {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error"
            });
            setError(errorMessage);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="container">
            <div className="login-box">
                <div className="login-name">
                    <h1>Login</h1>
                    <div className="underline-name"></div>
                </div>
                <form onSubmit={handleEmailLogin}>
                    <div className="input-box">
                        <div className="inputs">
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="underline-input"></div>
                        </div>
                        <div className="inputs">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="underline-input"></div>
                        </div>
                        <div className="submit-button">
                            <input
                                type="submit"
                                value={loading ? 'Logging in...' : 'Continue'}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
