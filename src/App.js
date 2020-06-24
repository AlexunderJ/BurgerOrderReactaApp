import React from "react";
import Layout from "./pages/Layout";
import BuilderBurger from "./pages/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <p>Test</p>
        <BuilderBurger />
      </Layout>
    </div>
  );
}

export default App;
