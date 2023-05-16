import React from "react";
import { useState } from "react";

const UserProfile = () => {
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("Mensaje");
  const bgImage =
    "https://images.unsplash.com/photo-1673447043169-a309c86f822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDczfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  const userimage =
    "https://images.unsplash.com/photo-1670582725604-ee64ac849e4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUwfGhtZW52UWhVbXhNfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  const activeBtnStyles =
    "bg-blue-600 text-white font-bold p-2 rounded-lg shadow-lg w-40 outline-none";

  const notActiveBtnStyles =
    "bg-primary text-black mr-4 font-bold p-2 rounded-lg w-40 outline-none";

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          {/* imagen de fondo */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={bgImage} //hacerlo dinamico con la db
              alt=""
              className="w-full h-60 2xl:h-510 shadow-lg object-cover rounded-lg"
            />
            <img
              src={userimage}
              className="rounded-full w-40 h-40 -mt-10 shadow-2xl object-cover"
              alt=""
            />
            <h1 className="font-bold text-3xl text-center mt-3 mb-10">
              Usuario anonimo
            </h1>{" "}
            <h5 className=" text-center mb-8 mt-0">
              {" "}
              Mar del Plata, Argentina
            </h5>
            <div className=" flex flex-row mt-0 mb-10">
              @user
              <li className=" mx-8">Trabajo actual</li>
              <li>Algo mas</li>
            </div>
            {/*hacerlo dinamico*/}
          </div>

          {/* botones */}
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("Mensaje");
              }}
              className={`${
                activeBtn === "Mensaje" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Mensaje
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("share");
              }}
              className={`${
                activeBtn === "share" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Compartir perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
