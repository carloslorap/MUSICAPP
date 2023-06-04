import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../index.css";
import { useEffect } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { IoClose, IoMusicalNote } from "react-icons/io5";

const MusicPlayer = () => {
  const [{ allSongs, isSongPlaying, songIndex },dispatch] = useStateValue();
  const [isPlayList, setisPlayList] = useState(false);
  const [isRotating, setIsRotating] = useState(false); 

  const toggleRotation = () => {
    setIsRotating(!isRotating); // Cambia el estado de rotación al hacer clic en el botón
  };
  

  const nextTrack =()=>{
    setIsRotating(false)
    if (songIndex > allSongs.length )   {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex:0
        })
    }else{
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex:songIndex + 1
        })
    }
    
  }

  const previousTrack=()=>{
    setIsRotating(false)
    if (songIndex === 0 ) {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex:0
        })
    }else{
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex:songIndex - 1
        })
    }
  }
  const closerPlayer =()=>{
    dispatch({
      type:actionType.SET_ISSONG_PLAYING,
      isSongPlaying:false
    })
  }
  return (
    <div className="w-full flex items-center gap-3 bg-bbg_hover">
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img
          alt=""
          src={allSongs[songIndex]?.imageURL}
          className={`image ${isRotating ? 'rotate' : ''}`}
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-textColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 15
                ? `${allSongs[songIndex]?.name.slice(0, 14)}...`
                : allSongs[songIndex]?.name
            }`}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-gray-400 font-semibold">
            {allSongs[songIndex]?.artist}
            <span className="text-sm text-textColor font-semibold px-1">
              ({allSongs[songIndex]?.category})
            </span>
          </p>

          <motion.i whileTap={{ scale: 0.8 }} onClick={()=>setisPlayList(!isPlayList)}>
            <RiPlayListFill className="text-textColor hover:text-colorBlyue text-lg cursor-pointer" />
            
          </motion.i>
        </div>
       
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            onPlay={toggleRotation}
            onPause={()=>setIsRotating(false)}
            autoPlay={true}
            showSkipControls
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={nextTrack}
            
          />
        </div>
        {isPlayList && <PlayListCard />}
        <motion.i whileTap={{ scale: 0.8 }}>
        <IoClose onClick={closerPlayer} className="relative bottom-6 text-2xl text-colorBlyue cursor-pointer"/>
        </motion.i>
      </div>
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();

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

  const setcurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== songindex) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songindex,
      });
    }
  };
  return (
    <div className="absolute z-100 left-4 bottom-24 gap-2 py-2 w-350  h-510 flex flex-col overflow-y-scroll scrollbar-thin rounded-md bg-primary border border-bg_darkgry">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => ( 
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setcurrentPlaySong(index)}
            key={music._id}>
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="text-lg text-headingColor font-semibold">
              <p className="text-xl text-headingColor font-semibold">
                {`${
                  music?.name.length > 15
                    ? `${music?.name.slice(0, 14)}...`
                    : music?.name
                }`}
                <span className="text-base">
                  ({music?.album})
                </span>
              </p>
              <p className="text-textColor">
                {music?.artist}
                <span className="text-sm text-textColor font-semibold px-1">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
