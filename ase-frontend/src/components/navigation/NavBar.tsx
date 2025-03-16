import { useState } from "react";
import { Menu, X} from "lucide-react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Mind Board</h1>
                <div className="hidden md:flex space-x-6">
                    <a href="/login" className="hover:text-blue-600"> Login </a>
                    <a href="/wip" className="hover:text-blue-600"> Import </a>
                </div>
                <button
                    className="md:hidden p-2 rounded bg-gray-200"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X/> : <Menu/>}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
                    <a href="/login" className="hover:text-blue-600"> Login </a>
                    <a href="/wip" className="hover:text-blue-600"> Import </a>
                </div>
            )}
        </nav>
    );
};

export default NavBar;