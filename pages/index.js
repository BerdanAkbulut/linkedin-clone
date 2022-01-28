import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Feed from "../components/Feed";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { modalState, modalTypeState } from "../atoms/modelAtom";
import { useRecoilState} from "recoil";
import { useEffect } from "react";
import Widgets from "../components/Widgets";

export default function Home({posts,articles}) {
  const router = useRouter();
  useEffect(()=> {
    console.log(posts)
  },[])
  
  const [modalOpen,setModalOpen] = useRecoilState(modalState)
  const [modalType,setModalType] = useRecoilState(modalTypeState)
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });
  return (
    <div className="bg-gray-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6  ">
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name="description" content="Linked In Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12 relative">
        <div className="flex flex-col md:flex-row gap-5 ">
          <Sidebar />

          <Feed posts={posts} />
        </div>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
          <Widgets articles={articles} />
        </AnimatePresence>
        {/* Sidebar */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // check user authenticated on the server ..

  // getSession -> serverside
  // useSession ->  client side

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // GET POSTS ON SERVER SİDE
  const response = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  const news = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2022-01-28&sortBy=popularity&apiKey=${process.env.NEWS_API}`).then((res)=>res.json())
  

  return {
    props: {
      session,
      articles:news.articles,
      posts:responseData.map((post)=> ({
        _id:post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: post.createdAt,
      }) )
    },
  };
}
