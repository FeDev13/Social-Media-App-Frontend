import React from "react";
import "tw-elements";
import { useState, useEffect } from "react";
import axios from "axios";

const AsideRight = () => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [id, setId] = useState("");
  const [userDataFollowers, setUserDataFollowers] = useState([]);
  const [userDataFollowing, setUserDataFollowing] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      const responseFollower = await axios.get(
        `http://localhost:5050/users/following/${data}`
      );
      const dataFollower = responseFollower.data;
      setFollowers(dataFollower);
    };
    fetchFollowers();
  }, []);

  useEffect(() => {
    const fetchFollowing = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      const responseFollowing = await axios.get(
        `http://localhost:5050/users/follow/${data}`
      );
      const dataFollowing = responseFollowing.data;
      setFollowing(dataFollowing);
    };
    fetchFollowing();
  }, []);

  useEffect(() => {
    const fetchUserDataFollowing = async () => {
      const promisesFollowing = following.map(async (following) => {
        const response = await axios.get(
          `http://localhost:5050/users/${following}`
        );

        return response.data;
      });

      const dataFollowing = await Promise.all(promisesFollowing);
      setUserDataFollowing(dataFollowing);
    };

    fetchUserDataFollowing();
  }, [following]);

  useEffect(() => {
    const fetchUserDataFollowers = async () => {
      const promisesFollowers = followers.map(async (followers) => {
        const response = await axios.get(
          `http://localhost:5050/users/${followers}`
        );

        return response.data;
      });

      const dataFollowers = await Promise.all(promisesFollowers);
      setUserDataFollowers(dataFollowers);
    };

    fetchUserDataFollowers();
  }, [followers]);

  useEffect(() => {
    const asyncFn = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      setId(data);
      const dato = await axios.get(`http://localhost:5050/users/${data}`);
      setCurrentUserName(dato.data.username);
      setCurrentUserImage(dato.data.avatarImage);
      setFollowers(dato.data.following);
      setFollowing(dato.data.followers);
      const post = await axios.get(`http://localhost:5050/posts/${data}`);
      setPost(post.data);
    };
    asyncFn();
  }, []);

  return (
    <>
      <div className="flex  w-[25%] flex-col gap-y-5 pt-[2%] max-lg:w-[25%] max-sm:hidden">
        <div className="fixed flex w-[20%]  justify-center max-lg:w-[25%]">
          <div className="flex w-full flex-col rounded-lg bg-white p-3 shadow-lg dark:text-white dark:bg-[#16181C] ">
            <div className="flex flex-col justify-center">
              <div className="relative flex justify-center">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  className=" bottom-0 w-[70%] p-2 rounded-lg "
                  alt=""
                />
              </div>
              <h1 className="text-center text-xl my-3 font-bold">
                {currentUserName}
              </h1>
              <h3 className="text-center text-xs font-extralight">
                @{currentUserName}
              </h3>
              <div className="my-3 flex w-[100%]">
                <div className="flex w-[33%] flex-col items-center">
                  <h1 className="text-lg font-bold">{post.length}</h1>
                  <h3 className="text-xs font-extralight opacity-60">Post</h3>
                </div>
                <div className="flex w-[33%] flex-col items-center">
                  <h1 className="text-lg font-bold">{followers.length}</h1>
                  {/* <h3 className="text-xs font-extralight opacity-60">
                    Following
                  </h3> */}
                  <button
                    type="button"
                    className="text-xs font-extralight opacity-60
      
      transition duration-150
      ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalFollowers"
                  >
                    Followers
                  </button>

                  <div
                    className="modal z-10 fade fixed hidden  h-full w-full top-[30%] right-0 overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModalFollowers"
                    tabindex="-1"
                    aria-labelledby="exampleModalFollowers"
                    aria-modal="true"
                    role="dialog"
                  >
                    <div className="flex  w-[20%] m-auto bg-white  dark:bg-[#16181C] dark:text-white shadow-lg rounded-lg ">
                      <div class="modal-dialog pointer-events-none relative w-full ">
                        <div class="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white dark:bg-[#16181C] bg-clip-padding text-current outline-none">
                          <div class="modal-body relative p-4  ">
                            <div className="flex relative w-full justify-center">
                              <div className="flex w-full justify-center border-b border-gray-200">
                                <h1 className="text-lg font-bold mb-5 mt-2 ">
                                  Followers
                                </h1>
                              </div>

                              <button
                                type="button"
                                id="modal"
                                className="rounded absolute right-0 top-1 px-3  py-2 text-xs font-medium uppercase leading-tight text-white shadow-md  transition duration-150 ease-in-out hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                data-bs-dismiss="modal"
                              >
                                X
                              </button>
                            </div>
                            {userDataFollowers.map((Element) => {
                              return (
                                <>
                                  <a
                                    href={"/Profile/" + Element._id}
                                    className=""
                                  >
                                    <div className="relative flex w-[100%] border-notificacion gap-5 p-[2%] items-center text-black dark:text-white justify-center ">
                                      <div className="w-[15%]">
                                        <img
                                          src={`data:image/svg+xml;base64,${Element.avatarImage}`}
                                          alt=""
                                        />
                                      </div>
                                      <h1 className="font-extralight">
                                        <span className="font-light">
                                          {Element.username}
                                        </span>{" "}
                                      </h1>
                                    </div>
                                  </a>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[33%] flex-col items-center">
                  <h1 className="text-lg font-bold">{following.length}</h1>
                  {/* <h3 className="text-xs font-extralight opacity-60">
                    Following
                  </h3> */}
                  <button
                    type="button"
                    className="text-xs font-extralight opacity-60
      transition duration-150
      ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalFollowing"
                  >
                    Following
                  </button>

                  <div
                    className="modal z-10 fade fixed hidden  h-full w-full top-[30%] right-0 overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModalFollowing"
                    tabindex="-1"
                    aria-labelledby="exampleModalFollowing"
                    aria-modal="true"
                    role="dialog"
                  >
                    <div className="flex  w-[20%] m-auto bg-white  dark:bg-[#16181C] dark:text-white shadow-lg rounded-lg ">
                      <div class="modal-dialog pointer-events-none relative w-full ">
                        <div class="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white dark:bg-[#16181C] bg-clip-padding text-current outline-none">
                          <div class="modal-body relative p-4  ">
                            <div className="flex relative w-full justify-center">
                              <div className="flex w-full justify-center border-b border-gray-200">
                                <h1 className="text-lg font-bold mb-5 mt-2 ">
                                  Following
                                </h1>
                              </div>

                              <button
                                type="button"
                                id="modal"
                                className="rounded absolute right-0 top-1 px-3  py-2 text-xs font-medium uppercase leading-tight text-white shadow-md  transition duration-150 ease-in-out hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                data-bs-dismiss="modal"
                              >
                                X
                              </button>
                            </div>
                            {userDataFollowing.map((Element) => {
                              return (
                                <>
                                  <a
                                    href={"/Profile/" + Element._id}
                                    className=""
                                  >
                                    <div className="relative flex w-[100%] py-3 border-notificacion gap-5 p-[2%] items-center text-black dark:text-white justify-center ">
                                      <div className="w-[15%]">
                                        <img
                                          src={`data:image/svg+xml;base64,${Element.avatarImage}`}
                                          alt=""
                                        />
                                      </div>
                                      <h1 className="font-extralight">
                                        <span className="font-bold">
                                          {Element.username}
                                        </span>{" "}
                                      </h1>
                                    </div>
                                  </a>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideRight;
