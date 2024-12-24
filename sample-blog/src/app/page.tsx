"use client";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {getPosts} from "@/app/services/fetch-data";
import {Post} from "@/app/models/data.model";

const PostComponent = dynamic(() => import("@/app/pages/posts/page"), {ssr: false});

export default function Home() {

  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    async function fetch() {
      const posts = await getPosts();
      setData(posts);
    }

    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-wrap h-full justify-center items-center bg-zinc-800">
        <PostComponent posts={data}/>
      </div>

    </>
  );
}
