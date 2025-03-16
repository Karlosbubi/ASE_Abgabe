import { useState } from "react";
import LoginForm from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";
import NavBar from "../navigation/NavBar.tsx"; // Stelle sicher, dass du die RegisterForm-Komponente importierst

const LoginPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleShowLoginForm = () => {
        setShowRegisterForm(false);
    };

    return (<>
        <NavBar />
        <div className="flex justify-center items-start h-screen pt-20">
            <div className="w-full max-w-xs">
                {!showRegisterForm ? (
                    <div>
                        <LoginForm />
                        <div className="text-center mt-4">
                            <p>
                                Noch keinen Account?{" "}
                                <button
                                    onClick={handleShowRegisterForm}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    Registrieren
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <RegisterForm />
                        <div className="text-center mt-4">
                            <p>
                                Schon einen Account?{" "}
                                <button
                                    onClick={handleShowLoginForm}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    Zurück zum Login
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>);
};

export default LoginPage;