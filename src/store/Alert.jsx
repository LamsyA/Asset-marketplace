import { FaRegTimesCircle } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { useGlobalState } from ".";

const Alert = () => {
  const [alert] = useGlobalState("alert");
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50 transform 
    transition-transform duration-300 ${alert.show ? "scale-100" : "scale-0"}`}
    >
      <div
        className="flex flex-col justify-center items-center
         bg-blue-500 shadow-xl shadow-red-50 
        rounded-xl min-w-min px-10 py-3 text-white"
      >
        {alert.color == "red" ? (
          <FaRegTimesCircle className="text-red-600 text-4xl " />
        ) : (
          <BsCheck2Circle className="text-green-600 text-4xl " />
        )}
        <p> {alert.msg}</p>
      </div>
    </div>
  );
};

export default Alert;
