import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./admin/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            element={<Bookingscreen />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/admin" element={<Adminscreen/>}/>
          <Route path="/" element={<Landingscreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
