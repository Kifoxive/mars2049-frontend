import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Rooms, CreateRoom, Game } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
