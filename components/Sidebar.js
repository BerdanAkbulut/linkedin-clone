import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { getSession, signOut, useSession } from "next-auth/react";


function Sidebar() {
  
 
  const {data: session} = useSession()

  return (
    <div className="space-y-2 min-w-max max-w-lg">
      <div
        className="bg-white dark:bg-[#1D2226]
       rounded-lg overflow-hidden relative flex flex-col
        items-center text-center border border-gray-300 dark:border-none"
      >
        <div className="relative w-full h-14">
          <Image
            src="https://marketplace.canva.com/EAEiQaq0NWg/1/0/1600w/canva-orange-ebb-and-flow-abstract-linkedin-banner-5YDmHwJk-Yc.jpg"
            layout="fill"
            priority
            alt="profile photo"
          />
        </div>
        <Avatar  src={session?.user?.image} className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer" />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer ">
          {session?.user?.name}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
          {session?.user?.email}
          </p>
        </div>
        <div className="hidden md:inline text-left dark:text-white/75 text-sm">
          <div className="font-medium sidebarButton space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile </h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>
          <div className="sidebarButton">
            <h4 className="leading-4 text-xs">
              Access exclusive tools & insights
            </h4>
            <h4 className="dark:text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{" "}
              Try Premium for free
            </h4>
          </div>
          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
          </div>
        </div>
      </div>

      <div className="overflow-hidden hidden md:flex flex-col border bg-white dark:border-gray-900 text-blue-400/95 cursor-pointer dark:bg-gray-800 rounded-md py-2 px-2 text-sm leading-7 relative sticky top-20  ">
        <h4 className="hover:underline">Groups</h4>
        <h4 className="hover:underline">Events</h4>
        <h4 className="hover:underline">Followed Hashtags</h4>
        <span className=" hover:text-[35px] text-[23px] absolute top-9 right-2 text-white/70">
          +
        </span>
        <div className="dark:border-t  border-gray-500 py-2 mt-2 items-center">
          <h2 className="text-black  dark:text-white/90 text-center text-md hover:opacity-70 ">
            Discover More
          </h2>
          <button className="text-red-500 hover:underline hover:shadow-2xl" onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
