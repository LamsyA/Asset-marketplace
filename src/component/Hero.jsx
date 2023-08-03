import Typewriter from 'typewriter-effect';
import { setGlobalState, useGlobalState } from '../store';
import { MdVerified } from 'react-icons/md';

const Hero = () => {
  const [showModal] = useGlobalState('showModal');
  const [verified] = useGlobalState('verified');
  const [registerModal] = useGlobalState('registerModal');
  const [verifyModal] = useGlobalState('verifyModal');

  console.log('verified', verified);
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 md:pb-10 px-5">
      <div className="flex flex-col md:flex-row md:items-start justify-start w-full">
        <div className="flex flex-col px-4 md:px-8 pt-8 md:pt-0 pb-4 md:py-6 h-screen md:w-1/2">
          <div className="w-full">
          <h1 className="
              text-5xl md:text-6xl text-slate-200
              font-poppins mb-12 tracking-tight
              ">
            <span className="capitalize mb-5">
              {' '}
              Looking for a new way to showcase and sell your assets?{' '}
            </span>
          </h1>
          </div>
          {!verified ? (
          <div className="flex items-start justify-center">
            <button
              className="inline-block w-44 mt-10 justify-center space bg-purple-600 px-2 md:px-5 py-2
              rounded-md text-xl text-white hover:shadow-yellow-800
              transition ease-in duration-200
              text-sm uppercase leading-tight hover:bg-purple-800"
              onClick={() => setGlobalState('showModal', 'scale-100')}
            >
              Mint Asset
            </button>
          </div>
      ) : (
        <div className="flex justify-items-start font-poppins">
          <div className="flex justify-center items-center space-x-4 md:space-x-12">
            <div className="flex justify-center ">
              <button
                className="inline-block w-36 mt-10 justify-center space bg-purple-600 px-2 md:px-5 py-2
                          rounded-md text-xl text-white hover:shadow-yellow-800
                          transition ease-in duration-200
                          text-sm uppercase leading-tight hover:bg-purple-800
                          "
                onClick={() => setGlobalState('registerModal', 'scale-100')}
              >
                Register
              </button>
            </div>

            <div className="flex justify-center">
              <button
                className="inline-block w-36 mt-10 justify-center space bg-teal-600 px-2 md:px-5 py-2
                rounded-md text-xl text-white hover:shadow-yellow-800 
                transition ease-in duration-200
                text-sm uppercase leading-tight hover:bg-teal-800"
                onClick={() => setGlobalState('verifyModal', 'scale-100')}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
        <div className="flex justify-center items-center
            px-4 md:px-8 pt-0 w-full md:w-1/2">
          <div className="
            flex flex-col text-left justify-center
            md:px-8 rounded-md py-4 md:py-6">
            <p className="text-left mx-0 text-4xl text-purple-400 pb-6">
              Our platform allows you to:
            </p>
            <div className="px-4 md:px-8">
              <ol className="text-white list-disc font-poppins
                  list-outside leading-4 md:leading-6">
                <li className="pb-4">Mint your assets to NFTs</li>
                <li className="pb-4">Display them with backing documents that can be bought by anyone.</li>
                <li className="pb-4">Ownership transfer is also streamlined, making the buying and selling process as smooth as possible</li>
                <li className="pb-4">Ensures that ownership is transferred securely and seamlessly</li>
              </ol>
            </div>
          </div>
        </div>
        {/* <div className="md:flex-grow h-60">
            <div className="text-lg text-left md:text-md xl:text-2xl font-bold font-poppins text-teal-500">
              <Typewriter
                options={{
                  strings: [
                    'Join the NFT revolution with our cutting-edge platform that enables you to mint and sell your assets with ease.',
                    'Our platform allows you to',
                    'Mint your assets to NFTs',
                    'And display them with backing documents that can be bought by anyone.',
                    'Our system ensures that ownership is transferred securely and seamlessly.',
                    'With our system, you can display your assets with backing documents as NFTs that can be bought by anyone.',
                    'Ownership transfer is also streamlined, making the buying and selling process as smooth as possible.',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 30,
                }}
              />
            </div>
          </div> */}

        {/*  <div className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-lg hover:shadow-black mb-6 md:mr-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBRUvybfRYaA8nNTmV9LGJJ1UMfgB4i3AFQ&usqp=CAU"
              alt="NFT ASSET"
              className="h-64 w-full object-cover rounded-lg"
            />
            <div className="flex justify-between items-center mt-3 text-sm md:text-md xl:text-sm font-bold text-teal-500">
              <div className='flex'>
              owner: {" "}
             <p className='text-black'>
             @0x034..09e1f
             </p>
              </div>
             
             <div className='flex'>
             <p className='text-black'>
             verified
             </p>
             <MdVerified className="text-green-500" size={20} />
             </div>
             <div className='flex text-red-700'>
             <p className='text-black'>
             Price:
             </p>
             5TH
             </div>
            
            </div>
          </div> */}
      </div>

      

      {/* <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center bg-teal-50 h-20 border shadow-md w-full">
          <span className="text-yellow-500 font-bold text-lg leading-5"> </span>
          <span>Sell Assets </span>
        </div>
        <div className="flex flex-col justify-center items-center bg-teal-50 h-20 border border-white shadow-md w-full">
          <span className="text-yellow-500 font-bold text-lg leading-5 "> </span>
          <span>Buy Assets </span>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
