import "./App.scss";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

// components
import { Header } from "./components/Header/Header";

// containers
import MovieList from "./containers/MovieList/MovieList";
import MovieDetail from "./containers/MovieDetail/MovieDetail";
import About from "./containers/About/About";
import Login from "./containers/Login/Login";
import Admin from "./containers/Admin/Admin";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Navigate to="/movies" />} />
               <Route path="/movies" element={<MovieList />} />
               <Route path="/movies/:id" element={<MovieDetail />} />
               <Route path="/about" element={<About />} />
               <Route path="/login" element={<Login />} />
               <Route path="/admin" element={<Admin />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
