import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import LoginPage from "./components/login/LoginPage.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from './utils/queryClient.ts';
import AdminDashboard from "./components/admin/AdminDashboard.tsx";


function App() {
    return (<>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" Component={HomePage} />
                  <Route path={"/login"} Component={LoginPage} />
                  <Route path={"/dashboard"} Component={Dashboard} />
                  <Route path={"/admin"} Component={AdminDashboard} />
              </Routes>
          </BrowserRouter>
        </QueryClientProvider>
  </>)
}

export default App;
