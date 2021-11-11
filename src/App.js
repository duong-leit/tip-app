import React from "react";
import Header from "./components/header";
import Container from "./components/container";
import "./assets/sass/main.scss";
import { HandleDataProvider } from "./components/Context.jsx";

function App() {
  return (
    <HandleDataProvider>
      <section className="page">
        <Header name="S P L I T T E R" />
        <Container />
      </section>
    </HandleDataProvider>
  );
}

export default App;
