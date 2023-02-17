import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Rooms, Credits, CreateRoom, Game } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
