import react from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./assets/components/Hero";

import { useState, useEffect } from "react";


function App() {
  //variables
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    Fetching();
  }, []);

  const Fetching = async () => {
    const response = await fetch("http://localhost:3000/notes");
    const jsonRes = await response.json();
    setDatos(jsonRes) 
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero task={datos && datos} Fetching={Fetching}/>} />
      </Routes>
    </>
  );
}

export default App;
