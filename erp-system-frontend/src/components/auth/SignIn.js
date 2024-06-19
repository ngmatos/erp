// src/components/auth/SignIn.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext'; // Importa o hook useAuth

function SignIn() {
    const history = useHistory();
    const { dispatch } = useAuth(); // Obtém dispatch do contexto de autenticação
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Endereço de email inválido')
                .required('O email é obrigatório'),
            password: Yup.string()
                .required('A senha é obrigatória')
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:8080/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to sign in');
                }

                const data = await response.json();
                console.log('User signed in:', data);

                // Save the token in localStorage
                localStorage.setItem('token', data.token);

                // Dispatch ação LOGIN para atualizar o estado global
                dispatch({ type: 'LOGIN', payload: { token: data.token } });

                // Redirect to homepage
                history.push('/homepage');
            } catch (error) {
                console.error('Error signing in:', error);
                setError('Invalid email or password. Please try again.');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

            {error && <p>{error}</p>}

            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
