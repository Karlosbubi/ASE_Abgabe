import NavBar from "./navigation/NavBar.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />

            <main className="pt-16"> {/* Höhe der Navbar berücksichtigen */}
                <div>
                    <h1> Mind Board Placeholder</h1>
                </div>
            </main>
        </>
    );
};

export default HomePage;