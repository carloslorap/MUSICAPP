import React from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { DashboardAlbums, DashboardArtists, DashboardHome, DashboardNewSongs, DashboardSongs, DashboardUsers } from './index'


const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Header />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly font-bold">
        <NavLink to={"/dashboard/home"} className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink to={"/dashboard/user"} className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
              User
        </NavLink>
        <NavLink to={"/dashboard/songs"} className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
              Songs
        </NavLink>
        <NavLink to={"/dashboard/artist"} className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
              Artist
        </NavLink>
        <NavLink to={"/dashboard/albums"} className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }>
              Albums
        </NavLink>

      </div>

      <div className="my-4 w-full p-4">
            <Routes>
              <Route path="/home" element={<DashboardHome/>}/>
              <Route path="/user" element={<DashboardUsers/>}/>
              <Route path="/songs" element={<DashboardSongs/>}/>
              <Route path="/artist" element={<DashboardArtists/>}/>
              <Route path="/albums" element={<DashboardAlbums/>}/>
              <Route path="/newSong" element={<DashboardNewSongs/>}/>
            </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
