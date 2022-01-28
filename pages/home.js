import { useEffect } from "react";
import Image from "next/image";
import HeaderLink from "../components/HeaderLink";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

function Home({providers}) {
  
  console.log(providers)
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn</title>
        <meta name="description" content="LinkedIn" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
        />
      </Head>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10 ">
          <Image
            src="https://www.citypng.com/public/uploads/preview/hd-linkedin-official-logo-transparent-background-31623962207jz85kqlqot.png"
            layout="fill"
            objectFit="contain"
            alt="LinkedIn Logo"
            className=""
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-400">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4 flex flex-col">
            <div className="flex border items-center border-white/100 bg-white rounded-md px-4 py-3 justify-between cursor-pointer transition-all hover:border-4 max-w-md ">
              <h2 className="text-xl">Search a job</h2>
              <ArrowForwardIcon className="text-gray-700" />
            </div>
            <div className="flex border border-white/100 items-center bg-white rounded-md px-4 py-3 justify-between cursor-pointer transition-all hover:border-4 max-w-md  ">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIcon className="text-gray-700" />
            </div>
            <div className="flex border items-center border-white/100 bg-white rounded-md px-4 py-3 justify-between cursor-pointer transition-all hover:border-4 max-w-md ">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative top-14 right-5 xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] ">
          <Image
            src="https://rb.gy/vkzpzt"
            alt="Home Page photo"
            layout="fill"
            priority
          />
        </div>
      </main>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    }
  };
}
