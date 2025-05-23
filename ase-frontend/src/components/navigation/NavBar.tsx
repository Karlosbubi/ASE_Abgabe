import { useState } from "react";
import { Menu, X} from "lucide-react";
import {ClearCurrentUser, GetCurrentUser} from "@/utils/storageWrapper.ts";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = GetCurrentUser();
    console.log(user?.isAdmin);

    if(user){
        return (
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <a className="text-xl font-bold" href="/">Mind Board</a>
                    <div className="hidden md:flex space-x-6">
                        <a data-testid="dashboard-link" href="/dashboard"
                           className="hover:text-blue-600"> Dashboard </a>
                        {user.isAdmin && (
                            <a href="/admin" className="hover:text-blue-600"> Admin </a>
                        )}
                        <a href="/" className="hover:text-blue-600" onClick={ClearCurrentUser}
                           data-testid="logout-link"> Logout </a>
                    </div>
                    <button
                        className="md:hidden p-2 rounded bg-gray-200"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X/> : <Menu/>}
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
                        <a href="/wip" className="hover:text-blue-600"> Import </a>
                        <a data-testid="dashboard-link" href="/dashboard"
                           className="hover:text-blue-600"> Dashboard </a>
                        <a href="/" className="hover:text-blue-600" onClick={ClearCurrentUser}> Logout </a>
                    </div>
                )}
            </nav>
        )
    } else {
        return (
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <a className="text-xl font-bold" href="/">Mind Board</a>
                    <div className="hidden md:flex space-x-6">
                        <a href="/login" className="hover:text-blue-600"> Login </a>
                    </div>
                    <button
                        className="md:hidden p-2 rounded bg-gray-200"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X/> : <Menu/>}
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
                        <a href="/wip" className="hover:text-blue-600"> Import </a>
                        <a href="/login" className="hover:text-blue-600"> Login </a>
                    </div>
                )}
            </nav>
        )
    }
};

export default NavBar;