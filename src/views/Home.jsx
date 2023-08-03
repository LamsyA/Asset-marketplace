import AssetInstructions from "../component/AssetInstruction";
import Assets from "../component/Assets";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import HomeMintButton from "../component/HomeMintButton";
import MintAsset from "../component/MintAsset";
import RegisterUser from "../component/RegisterUser";
import VerifyUser from "../component/verify";
import { useGlobalState } from "../store";

const Home = () => {
  const [assets] = useGlobalState("assets");
  return (
    <>
  
      <Hero />
      <Assets assets={assets} />
    
        <MintAsset />
        <HomeMintButton />
        <RegisterUser/>
        <VerifyUser/>
        <AssetInstructions/>
      {/* <Footer /> */}
    
     
    </>
  );
};

export default Home;
