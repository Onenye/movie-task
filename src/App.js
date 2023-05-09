import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Moreinfo from "./Moreinfo";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/moreinfo/:id" element={<Moreinfo />} />
      </Routes>
    </div>
  );
}

export default App;
