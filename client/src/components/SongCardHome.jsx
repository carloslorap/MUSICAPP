import React from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const SongCardHome = ({ data, index, type }) => {
  const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };
  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-headingColor bg-bg_darkgry shadow-md rounded-lg flex flex-col items-center"
      onClick={type === "song" && addToContext}
      key={data.id}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounde-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          src={data.imageURL}
          whileHover={{ scale: 1.5 }}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      {/*este código muestra el nombre contenido en el objeto "data", pero si el nombre tiene más de 25 caracteres, se muestra una versión truncada con ".." al final.*/}
      <p className="text-base text-center text-textColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {" "}
            {data.artist.length > 20
              ? `${data.artist.slice(0, 20)}..`
              : data.artist}
          </span>
        )}
      </p>

    </motion.div>
  );
};

export default SongCardHome;
