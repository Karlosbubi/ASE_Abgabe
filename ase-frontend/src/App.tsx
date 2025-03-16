import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import LoginPage from "./components/login/LoginPage.tsx";

function App() {

  return (<>
      <BrowserRouter>
          <Routes>
              <Route path="/" Component={HomePage} />
              <Route path={"/login"} Component={LoginPage} />
          </Routes>
      </BrowserRouter>
  </>)
}

export default App;
