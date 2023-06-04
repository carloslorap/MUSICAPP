import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { changingUserRole, getAllUsers, removeUser } from "../api";
import { actionType } from "../context/reducer";

export const DashboardUserCard = ({ data, index }) => {
  //Formula para cuando la fecha que estes consumiendo sea de unas letras q no conoces ps esta esta
  //formula de aca lo hara mas entendible
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);

  

  const updateUserRole = (userId, role) => {
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.user,
          });
        });
      }
    });
  };
  const deleteUser=(userId)=>{
    removeUser(userId).then((res)=>{
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.user,
          });
        });
      }
    })
  }

  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-headingColor hover:shadow-md"
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-100"
          onClick={() => deleteUser(data._id)}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}
      
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data.imageURL}
          alt={data.name}
          referrerPolicy="no-referrer"
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verified ? "True" : "False"}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor ">{data.role}</p>

        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px] font-extrabold text-primary px-1 bg-colorBlyue rounded-sm hover:shadow-md"
            onClick={() => setIsUserRoleUpdated(true)}
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}

        {isUserRoleUpdated && (
          <motion.div
            className="absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-primary shadow-xl rounded-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <p className="text-textColor text-[10px] font-semibold">
              Are you sure, do you want to mark the user as{" "}
              <span>{data.role === "admin" ? "member" : "admin"} ?</span>
            </p>

            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-colorBlyue text-primary hover:shadow-md"
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                Yes
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md"
                onClick={() => setIsUserRoleUpdated(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] bg-bg_darkgry overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-headingColor rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold text-headingColor">
            Count:
            <span className="text-xl font-semibold text-textColor m-2">
              {allUsers?.length}
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>
        </div>

        {allUsers &&
          allUsers?.map((data, i) => (
            <DashboardUserCard data={data} index={i} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
