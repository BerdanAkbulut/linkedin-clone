import Image from "next/image";
import React from "react";
import TimeAgo from "timeago-react";

function Widgets({ articles }) {
  articles = articles.slice(0, 5);
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;
  return (
    <div className="relative max-w-lg xl:h-1/3 md:h-1/3 sm:h-1/3 xs:h-1/3 overflow-hidden  dark:bg-gray-800/80 py-2 px-2 text-md font-medium border border-gray-400 dark:border-none rounded-lg dark:text-white/75  text-black ">
      <h3 className="text-center text-lg font-semibold text-white mb-1">
        LinkedIn News
      </h3>
      <hr />
      {articles.map((article, key) => (
        <div key={key}>
          <li className="mt-1.5 cursor-pointer dark:hover:text-white/20 ">
            {truncate(article.title, 100)}
          </li>
          <TimeAgo
            datetime={article.publishedAt}
            className="text-xs mt-0.5 dark:text-white/75 opacity-80"
          />
        </div>
      ))}
      <div className= " sm:hidden bg-white mt-5 dark:bg-transparent  w-11/12 h-64 px-2.5  rounded-lg sticky top-10 border border-gray-300 dark:border-none">
        <div className="relative w-full h-full ">
          <Image
            src="https://rb.gy/kbfeaa"
            layout="fill"
            objectFit="contain"
            priority
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
