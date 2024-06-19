// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        token: localStorage.getItem('token') || null,
    });

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8080/auth/validate-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        dispatch({ type: ACTIONS.LOGIN, payload: { token } });
                    } else {
                        dispatch({ type: ACTIONS.LOGOUT });
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    dispatch({ type: ACTIONS.LOGOUT });
                    localStorage.removeItem('token');
                }
            }
        };

        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
