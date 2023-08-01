import Typewriter from 'typewriter-effect';
import { setGlobalState, useGlobalState } from '../store';

const Hero = () => {
  const [showModal] = useGlobalState('showModal');
  const [verified] = useGlobalState('verified');
  const [registerModal] = useGlobalState('registerModal');
  const [verifyModal] = useGlobalState('verifyModal');

  console.log('verified', verified);
  return (
    <div className="text-center bg-teal-50 py-32 px-5">
      <div>
        <div>
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-12 tracking-tight">
            <span className="xl:text-3xl capitalize mb-5">
              {' '}
              Looking for a new way to showcase and sell your assets?{' '}
            </span>
          </h1>
        </div>

        {/* Flex container for image and typewriter content */}
        <div className="flex flex-col md:flex-row items-center justify-start mb-10">
          {/* Image Card */}
          <div className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-lg hover:shadow-black mb-6 md:mr-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxTKOmEVhMssjZ_gY9xINttr90NgPazzFt8A&usqp=CAU"
              alt="NFT ASSET"
              className="h-64 w-full object-cover rounded-lg"
            />
            <div className="flex justify-center items-center mt-3 text-sm md:text-md xl:text-sm font-bold text-teal-500">
              @0x034..09e1f
            </div>
          </div>

          {/* Typewriter content */}
          <div className="mt-6 md:mt-0 md:flex-grow">
            <div className="text-lg md:text-md xl:text-xl font-bold text-teal-500">
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
          </div>
        </div>
      </div>

      {verified == true ? (
        <div className="flex justify-center">
          <button
            className="inline-block mt-10 justify-center space bg-white px-5 py-2
                      rounded-full text-yellow-600 shadow-md shadow-gray-900 hover:shadow-yellow-800 
                      text-sm uppercase leading-tight border border-yellow-600"
            onClick={() => setGlobalState('showModal', 'scale-100')}
          >
            Mint Asset
          </button>
        </div>
      ) : (
        <div className="flex justify-around items-center">
          <div className="flex justify-center items-center space-x-12">
            <div className="flex justify-center ">
              <button
                className="inline-block mt-10 justify-center space bg-white px-5 py-2
                              rounded-full text-yellow-600 shadow-md shadow-gray-900 hover:shadow-yellow-800 
                              text-sm uppercase leading-tight border border-yellow-600  hover:border-white
                              hover:bg-yellow-900  hover:text-white"
                onClick={() => setGlobalState('registerModal', 'scale-100')}
              >
                Register
              </button>
            </div>

            <div className="flex justify-center">
              <button
                className="inline-block mt-10 justify-center space bg-yellow-600 px-5 py-2
                              rounded-full text-white shadow-md shadow-gray-900 hover:shadow-yellow-800 
                              hover:bg-white hover:text-yellow-600 text-sm uppercase leading-tight 
                              border border-white hover:border-yellow-800"
                onClick={() => setGlobalState('verifyModal', 'scale-100')}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center bg-teal-50 h-20 border shadow-md w-full">
          <span className="text-yellow-500 font-bold text-lg leading-5"> </span>
          <span>Sell Assets </span>
        </div>
        <div className="flex flex-col justify-center items-center bg-teal-50 h-20 border border-white shadow-md w-full">
          <span className="text-yellow-500 font-bold text-lg leading-5 "> </span>
          <span>Buy Assets </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
