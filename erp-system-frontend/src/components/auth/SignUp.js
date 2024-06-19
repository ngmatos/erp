// src/components/auth/SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUp() {
    const history = useHistory();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'O nome deve ter pelo menos 3 caracteres')
                .required('O nome é obrigatório'),
            email: Yup.string()
                .email('Endereço de email inválido')
                .required('O email é obrigatório'),
            password: Yup.string()
                .min(6, 'A senha deve ter pelo menos 6 caracteres')
                .required('A senha é obrigatória')
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:8080/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to sign up');
                }

                const data = await response.json();
                console.log('User created:', data);
                history.push('/signin');
            } catch (error) {
                console.error('Error creating user:', error);
                setError('Error creating user. Please try again.');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
            ) : null}

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

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
