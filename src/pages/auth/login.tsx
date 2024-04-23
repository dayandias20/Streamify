import { useState, useEffect } from 'react';
import { useAuth, User } from './useAuth';
import '../pages.css';
import './login.css';

export const Login = () => {
    const { user, login, logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    // const [loggedInUser, setLoggedInUser ] = useState<User>();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        
        if (email === 'dayan@gmail.com' && password === '123') {
            try {
                await login(email, password);

            } catch (error) {
                setError('Failed to log in. Please try again.');
            }
        } else {
            setError('Incorrect email or password.');
        }
        console.log(user)
    };

    const handleLogout = () => {
        console.log(user?.name)
        logout();

    };

    return (
        <div className="container ">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
                <div></div>
                { !user ? (
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleSubmit}>
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Sign In</h3>
                                <div className="form-group mt-3">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                                {error && <p className="text-danger mt-2">{error}</p>}
                                <p className="forgot-password text-right mt-2">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <button type="button" className="btn btn-primary" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                )}
                <div></div>
            </div>
        </div>
    );
};
