import Assets from "../component/Assets";
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
      <div className="flex justify-center items-center my-5 ">
        <button
          className=" inline-block justify-center space bg-yellow-500 px-5 py-2
            rounded-md text-white hover:bg-slate-500 hover:text-black font-semibold
            text-sm uppercase leading-tight border-none"
        >
          Load More
        </button>
      </div>
      <MintAsset />
      <HomeMintButton />
      <RegisterUser/>
      <VerifyUser/>
    </>
  );
};

export default Home;
