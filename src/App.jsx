import { useState } from "react";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Myroutes from "./routes/Myroutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="font-bold">
        <Layout />
      </div> */}
      <BrowserRouter>
        <Myroutes />
      </BrowserRouter>
    </>
  );
}

export default App;
