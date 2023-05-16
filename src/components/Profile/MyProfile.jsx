import React from "react";
import Navbar from "../Navbar/Navbar";
import Logout from "../Logout";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
export default function Profile() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [background, setBackground] = useState("");
  const [currentDescripcion, setCurrentDescripcion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Si no hay usuario te redirecciona a login

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const asyncFn = async () => {
      if (!localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    asyncFn();
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      setId(data);
      const dato = await axios.get(`http://localhost:5050/users/${data}`);
      setCurrentUserName(dato.data.username);
      setBackground(dato.data.background);
      setCurrentUserImage(dato.data.avatarImage);
      setCurrentDescripcion(dato.data.descripcion);
    };
    asyncFn();
  }, []);
  console.log(setCurrentUser);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("descripcion", descripcion);
      bodyFormData.append("background", background[0]);
      const resp = await axios.put(
        `http://localhost:5050/users/${id}`,
        bodyFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCurrentUserName(username);
      setCurrentDescripcion(descripcion);
      setBackground(background);
      window.location.reload();
      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <section>
        <Navbar />

        <form onSubmit={handleClick} encType="multipart/form-data">
          <div className="relative pb-2 h-full mt-20 justify-center items-center">
            <div className="flex flex-col pb-5 dark:text-white">
              <div className="relative flex flex-col mb-7">
                {/* imagen de fondo */}
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={background} //hacerlo dinamico con la db
                    alt=""
                    className="w-full h-60 2xl:h-510 shadow-lg object-cover rounded-lg"
                  />
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    className="rounded-full w-40 h-40 -mt-10 shadow-2xl object-cover"
                    alt=""
                  />
                  <h1 className="font-bold text-3xl text-center mt-3 mb-10">
                    {currentUserName}
                  </h1>
                  <h5 className=" text-center mb-8 mt-0">
                    {" "}
                    {currentDescripcion}
                  </h5>
                  <div className=" flex flex-row mt-0 mb-10">
                    @{currentUserName}
                  </div>
                  {/*hacerlo dinamico*/}
                </div>

                {/* botones */}
                <div className="text-center mb-7">
                  {/* <Link to='/chat' className="py-3 px-6 container rounded-lg ">
        <button
          type="button"
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn("share");
          }}
       
        >
          Mensajes
        </button>
        </Link > */}
                  <div className="flex justify-center gap-4">
                    <div className="w-full flex justify-center">
                      <div className="w-auto flex gap-3 justify-center sm: flex-col">
                        <Link to="/" className=" w-[10%]">
                          <Logout />
                        </Link>
                        <button
                          type="button"
                          id="btn"
                          className="border w-auto p-2 container cursor-pointer rounded-lg"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalEdit"
                        >
                          Edit
                        </button>
                      </div>
                      <div
                        className="modal fade fixed hidden h-full w-[30%] top-[50%] right-11 overflow-y-auto overflow-x-hidden outline-none"
                        id="exampleModalEdit"
                        tabIndex="-1"
                        aria-labelledby="exampleModalEdit"
                        aria-modal="true"
                        role="dialog"
                      >
                        <div className="flex h-[20%] w-full m-auto bg-white  dark:bg-[#16181C] dark:text-white shadow-lg rounded-lg ">
                          <div class="modal-dialog pointer-events-none relative w-full ">
                            <div class="modal-content pointer-events-auto relative flex w-full flex-col rounded-md shadow-lg border-search bg-white dark:bg-[#16181C] bg-clip-padding text-current outline-none">
                              <div class="modal-body relative p-4  ">
                                <div className="flex w-full flex-col gap-4 justify-center items-center">
                                  <h1 className="font-bold">
                                    Edit your profile
                                  </h1>
                                  <input
                                    className="border-search rounded-lg p-2 text-black w-10/12"
                                    placeholder="Change your name"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                  <input
                                    className="border-search rounded-lg p-2 text-black w-10/12"
                                    placeholder="Change your description"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) =>
                                      setDescripcion(e.target.value)
                                    }
                                  />

                                  <div className="flex flex-col items-center gap-2 ">
                                    <label
                                      class=" font-bold text-sm text-gray-900 dark:text-white cursor-pointer"
                                      for="file_input"
                                    >
                                      Set background
                                      <input
                                        className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer hidden "
                                        id="file_input"
                                        type="file"
                                        onChange={(e) =>
                                          setBackground(e.target.files)
                                        }
                                      />
                                    </label>
                                  </div>
                                  <button
                                    className="border w-[50%] container cursor-pointer rounded-lg font-extralight p-2 text-white"
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <a href="/Login"> */}
                    {/* <button  onClick={hadndleLogout} className="dark:text-white bg-blue-600 text-white font-bold p-2 rounded-lg shadow-lg w-40 outline-none">salir</button></a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
