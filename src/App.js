import React from "react";
import Header from "./components/header";
import Container from "./components/container";
import "./assets/sass/main.scss";
// import events from "./events/events";

function App() {
  return (
    <section className="page">
      <Header name="S P L I T T E R" />
      <Container />
    </section>
  );
}

export default App;
