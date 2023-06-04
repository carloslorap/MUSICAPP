import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtists, getAllSongs } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { storage } from "../config/firebase.config";
import { ref,deleteObject } from 'firebase/storage'

const SongCard = ({data,index ,type}) => {
  const [isDelete, setisDelete] = useState(false)
  const [
    {
      allArtists,
      allSongs,
      allAlbums,
      isSongPlaying,
      songIndex
    },
     dispatch,
  ] = useStateValue();

  const deleteObject1 =(data )=>{
    if (type === "song") {
       const deleteRef =ref(storage,data.imageURL)
       deleteObject(deleteRef).then(() =>{})

      deleteSongById(data._id).then(res =>{
        if (res.data) {
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data,
            });
          });
        }else{
          
        }
      })
    }

    //album 
    if (type === "album") {
       const deleteRef =ref(storage,data.imageURL)
       deleteObject(deleteRef).then(() =>{})

      deleteAlbumById(data._id).then(res =>{
        if (res.data) {
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data,
            });
          });
        }else{
          
        }
      })
    }

    //artist
    if (type === "artist") {
       const deleteRef =ref(storage,data.imageURL)
       deleteObject(deleteRef).then(() =>{})

      deleteArtistById(data._id).then(res =>{
        if (res.data) {
          getAllArtists().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data,
            });
          });
        }else{
          
        }
      })
    }

    
  }


  const addToContext =()=>{
    if (!isSongPlaying) {
      dispatch({
        type:actionType.SET_ISSONG_PLAYING,
        isSongPlaying:true
      })
    }
    if (songIndex !== index) {
     dispatch({
      type:actionType.SET_SONG_INDEX,
      songIndex:index
     }) 
    }
  }
  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-headingColor bg-bg_darkgry shadow-md rounded-lg flex flex-col items-center' onClick={type === "song" && addToContext} key={data.id}>
        <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounde-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img src={data.imageURL}
            whileHover={{scale:1.5}}
            className='w-full h-full rounded-lg object-cover'/>
        </div>
 

        {/*este código muestra el nombre contenido en el objeto "data", pero si el nombre tiene más de 25 caracteres, se muestra una versión truncada con ".." al final.*/}
        <p className='text-base text-center text-textColor font-semibold my-2'>
            {data.name.length > 25 ? `${data.name.slice(0,25)}..` : data.name}
            {data.artist && (
              <span className='block text-sm text-gray-400 my-1'>   {data.artist.length > 20 ? `${data.artist.slice(0,20)}..` : data.artist}</span>
            )}
            
        </p>

        <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
          <motion.i 
          whileTap={{scale:0.75}}
          className='text-base text-red-400 drop-shadow-md hover:text-red-600'
          onClick={()=>setisDelete(true)}>
            <IoTrash/>
          </motion.i>
        </div>

              {isDelete &&(
                <motion.div className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2'
                initial={{opacity:0}}
                animate={{opacity:1}}> 
                    <p className='text-sm text-textColor font-semibold text-center py-4'>Are you sure do you want to delete it?</p>
  
                  <div className='flex items-center gap-4'>
                      <motion.button className='px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-400 cursor-pointer' whileTap={{scale:0.7}} onClick={()=>deleteObject1(data)}>Yes</motion.button>
                      <motion.button className='px-2 py-1 text-sm uppercase  bg-colorBlyue rounded-md hover:bg-cyan-100 cursor-pointer' whileTap={{scale:0.7}} onClick={()=>setisDelete(false)}>No</motion.button>
                  </div>
                </motion.div>
              )}
    </motion.div>
  )
}

export default SongCard