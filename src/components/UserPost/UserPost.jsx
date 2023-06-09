import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import MapsView from "../maps/MapsView";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Upload } from "../Upload";
import Picker from "emoji-picker-react";

const userPost = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [id, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const fetchData = async () => {
    const data = await JSON.parse(
      localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    setId(data);
    const res = await axios.get(`http://localhost:5050/users/${data}`);

    setProfile(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: id,
      desc: inputStr,
      user: profile,
    };

    //imagen
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:5050/upload", data);
      } catch (err) {}
    }
    //video
    if (video) {
      const fileName = new Date().getTime() + video.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const uploadVideo = {
              userId: id,
              desc: inputStr,
              video: downloadURL,
            };
            try {
              axios.post("http://localhost:5050/posts/", uploadVideo);
              window.location.reload();
            } catch (err) {}
          });
        }
      );
    }
    //texto
    else
      try {
        await axios.post("http://localhost:5050/posts/", newPost);
        window.location.reload();
      } catch (err) {}
  };

  const handleEmojiClick = (emojiObject, event) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleKey = (e) => {
    e.code === "Enter" && submitPost();
  };

  return (
    <>
      <div className="  h-full w-[80%] rounded-lg shadow-lg py-3 bg-white dark:text-white dark:bg-[#16181C] ">
        <div className=" h-full flex flex-col gap-y-12  rounded-lg py-5  items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Share your thoughts"
            className="rounded-lg flex justify-center m-auto py-5 bg-transparent w-[90%]  text-2xl outline-none  "
            required
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          />

          <div className=" flex  w-[90%]  ">
            <div className=" flex w-full items-center gap-10  ">
              <label>
                <svg //imagen
                  xmlns="http://www.w3.org/2000/svg"
                  fill="ff6961"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 plus cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <input
                  className=" hidden"
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <label>
                <svg //emoji
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 plus cursor-pointer"
                  onClick={() => setShowPicker((val) => !val)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </label>
              <label>
                <svg //video
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 plus cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <input
                  className=" hidden"
                  type="file"
                  id="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitPost}
                onKeyDown={handleKey}
                type="button"
                id="btn"
                className=" rounded-xl px-5 py-3 bg-black text-xs
      font-medium
      uppercase
      leading-tight
      text-white
      shadow-md
      transition
      duration-150
      ease-in-out
      hover:shadow-lg focus:shadow-lg
      focus:outline-none  focus:ring-0 
      active:shadow-lg sm:w-min
      md:w-auto
      lg:w-auto
      "
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/2">
        {showPicker && (
          <Picker
            pickerStyle={{ width: "100%" }}
            onEmojiClick={handleEmojiClick}
          />
        )}
      </div>
    </>
  );
};

export default userPost;
