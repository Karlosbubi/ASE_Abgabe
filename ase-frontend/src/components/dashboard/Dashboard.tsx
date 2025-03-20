import NavBar from "../navigation/NavBar.tsx";
import PersonalInfoCard from "./PersonalInfoCard.tsx";

const Dashboard = () => {
    //const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <main className="pt-16"> {/* Höhe der Navbar berücksichtigen */}
                <div className="flex justify-center items-start h-screen pt-20 bg-gray-200">
                    <PersonalInfoCard />
                </div>
            </main>
        </>
    );
};

export default Dashboard;