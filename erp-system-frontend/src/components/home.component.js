import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/crud/all.service";

const Home = () => {
    const [accessDeniedMessage, setAccessDeniedMessage] = useState("");
    const [name, setName] = useState("");
    const isAuthenticated = localStorage.getItem("token") && localStorage.getItem("user");

    useEffect(() => {
        // Verifica se há uma mensagem de acesso negado passada via props.location.state
        const { location } = window;
        if (location.state && location.state.accessDeniedMessage) {
            setAccessDeniedMessage(location.state.accessDeniedMessage);
        }

        // Obtém o nome do usuário do localStorage, se estiver autenticado
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setName(user.name);
        }
    }, []);

    return (
        <div className="container">
            {accessDeniedMessage && (
                <div className="alert alert-danger" role="alert">
                    {accessDeniedMessage}
                </div>
            )}
            <header className="jumbotron">
                {isAuthenticated ? (
                    <>
                        <div className="container">
                            <header>
                                <h3><strong>Welcome to System ERP {name}</strong></h3>
                            </header>
                        </div>
                        <div className="container">
                            <p>
                                Enterprise resource planning (ERP) is a platform companies use to manage and integrate the essential parts of their businesses. Many ERP software applications are critical to companies because they help them implement resource planning by integrating all the processes needed to run their companies with a single system.

                                An ERP software system can also integrate planning, purchasing inventory, sales, marketing, finance, human resources, and more.
                            </p>
                            <p>
                                This is just a <strong>Demo</strong> of a ERP System, made by <a
                                href="https://github.com/Diogoafg7" target="_blank" rel="noopener noreferrer">
                                <strong> Diogo Gomes</strong>
                            </a> using <strong>React</strong>, <strong>Node.js</strong> and <strong>Spring-Boot</strong>.
                            </p>
                        </div>
                    </>
                ) : (
                    <div>
                        <h3>Choose Login ou Signup</h3>
                        <Link to="/login">
                            <button className="btn btn-primary-home">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-secondary-home">SignUp</button>
                        </Link>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Home;
