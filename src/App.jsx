import Hero from "./component/Hero";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./views/Home";
import Asset from "./views/Asset";
import Alert from "./store/Alert";
import Loader from "./store/Loader";
import { useEffect, useState } from "react";
import {
  getContract,
  getOwner,
  getVerify,
  isWalletConnected,
  listAssets,
  listBuyers,
} from "./services/Blockchain";
import Footer from "./component/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log("Blockchain loaded");
      setLoaded(true);
      const result = await isWalletConnected();
      await getContract();
      await listAssets();
      await getOwner();
      await getVerify()
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen relative bg-teal-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets/:id" element={<Asset />} />
      </Routes>
      <Alert />
      <Loader />
      <Footer />
    </div>
  );
}

export default App;
