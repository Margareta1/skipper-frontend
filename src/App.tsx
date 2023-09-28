
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OneFIle from "./features/OneFile";
import SecondFIle from "./features/SecondFile";



function App() {


  const [accessCookie, setAccessCookie] = useCookies(["access"]);
  if (accessCookie) {
    console.log(accessCookie.access);
}
  return (
    <BrowserRouter>
    <CookiesProvider>
      <Routes>
        <Route path='/' element={<OneFIle />} />
        <Route path='/two' element={<SecondFIle />} />
      </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
