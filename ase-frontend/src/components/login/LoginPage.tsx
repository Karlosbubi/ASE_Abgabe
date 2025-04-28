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

    return (
        <div className="bg-gray-200">
        <NavBar />
        <div className="flex justify-center items-start h-screen pt-20">
            <div className="w-full max-w-xs">
                {!showRegisterForm ? (
                    <div>
                        <LoginForm />
                        <div className="text-center mt-4">
                            <p>
                                Don't have an account yet?{" "}
                                <button data-testid="register-now-link"
                                    onClick={handleShowRegisterForm}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    Register now
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <RegisterForm />
                        <div className="text-center mt-4">
                            <p>
                                Already have an account?{" "}
                                <button
                                    onClick={handleShowLoginForm}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    Login here
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>);
};

export default LoginPage;