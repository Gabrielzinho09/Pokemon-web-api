
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from "./pages/PokemonDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        //enrutamiento
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;