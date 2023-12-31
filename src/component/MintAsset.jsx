import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalState, setGlobalState, setMsgLoading, setAlert } from '../store';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { addAsset } from '../services/Blockchain';

const MintAsset = () => {
  const [showModal] = useGlobalState('showModal');

  const auth =
    'Basic ' +
    Buffer.from(
      import.meta.env.VITE_INFURA_ID + ':' + import.meta.env.VITE_INFURA_SECRET_KEY,
    ).toString('base64');

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [imgUpload, setImgUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) return;
    setGlobalState('showModal', 'scale-0');
    setMsgLoading('Uploading Data to IPFS...');

    try {
      const created = await client.add(fileUrl);
      setMsgLoading(`Adding ${title} in progress...`);
      const credential = `https://ipfs.io/ipfs/${created.path}`;
      console.log(' credential ', credential);

      const newData = { title, description, credential, price };

      const result = await addAsset(newData);
      console.log(newData);
      if (result === true) {
        setAlert(`${title} Successfully Added...`);
      } else {
        setAlert('Error adding Candidate details', 'red');
      }

      //   navigateTo('/CandidatePage')
      closeToggle();
    } catch (error) {
      console.log('Error Minting Asset: ', error);
      setAlert(error.message, 'red');
    }
  };

  const closeToggle = () => {
    setGlobalState('showModal', 'scale-0');
    resetForm();
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgUpload(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const resetForm = () => {
    setFileUrl('');
    setImgUpload(null);
    setTitle('');
    setDescription('');
    setPrice('');
  };
  const imgUrl =
    'https://pony.studio/design-for-growth/wp-content/uploads/2022/03/hape-beast.jpg';

  return (
    <div
      className={`fixed top-0 left-0 bottom-0
        w-screen h-screen flex
        items-center justify-center
        pt-16
        bg-gray-600 bg-opacity-20 backdrop-blur-md
        font-poppins text-white
        transform 
        transition-transform duration-300 ${showModal}`}
    >
      <div
        className="bg-[#1d283e] w-11/12 md:w-2/5
        md:h-7/12 p-6 rounded-md"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Add Asset</p>
            <button
              type="button"
              onClick={closeToggle}
              className="border-0 bg-transparent 
                        focus:outline-none "
            >
              <FaTimes />
            </button>
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-md mt-5"
          >
            <label className="block">
              <span className="sr-only">Choose Image item</span>
              <input
                className="block w-full text-sm text-slate-500 file:mr-4
                          file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm
                          hover:file:bg-[#101010] file:font-semibold focus:outline-none
                          cursor-pointer focus:ring-0"
                type="file"
                accept="image/png, image/gif, image/webp, image/jpeg, image/jpg"
                onChange={changeImage}
                required
              />
            </label>
          </div>
          <div
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-500 focus:outline-none focus:ring-0"
              type="text"
              placeholder="Title of Asset"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-md mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-700 focus:outline-none focus:ring-0"
              type="number"
              placeholder="Price (CELO))"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              min={0.01}
              step={0.01}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
                            rounded-md mt-5"
          >
            <textarea
              className="block w-full text-sm text-slate-500 bg-gray-300
                    focus:outline-none focus:ring-0 p-2
                      bg-transparent border-0 h-20 resize-none"
              type="text"
              placeholder="Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <button
            className=" flex justify-center items-center
            text-white bg-purple-600
            rounded-md mt-5 p-2 
            transition-transform duration-300 
            hover:bg-purple-800"
          >
            {' '}
            Mint Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default MintAsset;
