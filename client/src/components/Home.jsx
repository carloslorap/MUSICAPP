import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";

import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCardHome from "./SongCardHome";


const Home = () => {
  const [{ allSongs }, dispatch] = useStateValue();

  const [isFocus, setIsFocus] = useState(false);





  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data,
        });
      });
    }
  }, []);

  

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-full p-4 flex items-center justify-center flex-col ">
        <div className="w-full flex justify-center items-center gap-20">
          <input
            className={`w-880 px-4 py-2 border ${
              isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
            } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
            type="text"
            placeholder="Search Here..."
          
            onBlur={() => {
              setIsFocus(false);
            }}
            onFocus={() => setIsFocus(true)}
          />
        </div>
        {/* Main container */}
        <div className="relative w-full my-4 p-4 py-16  rounded-md">
          <SongContainer data={allSongs} />
        </div>
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCardHome key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};
export default Home;
