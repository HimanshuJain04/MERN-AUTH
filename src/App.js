import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Home from "./pages/Home"


function App() {

  return (
    <div className="w-full min-h-screen bg-[black]/[0.05] flex justify-center items-center">

      <Routes>

        <Route path="/home" exact element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="*" element={<div>Page Not Found</div>} />

      </Routes >
    </div >
  );
}

export default App;
