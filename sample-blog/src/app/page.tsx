"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getPosts } from "@/app/services/fetch-data";
import { Post } from "@/app/models/data.model";

// Explicitly typing PostComponent
const PostComponent = dynamic<any>(() =>
    import("@/app/pages/posts/page"),
  { ssr: false }
);

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
      <div className={"text-white flex items-center text-lg p-5 h-8 bg-zinc-800"}>
        <h1>Sample blog</h1>
      </div>
      <div className="flex flex-wrap h-5/6 justify-center items-center">
        // @ts-ignore
        <PostComponent posts={data} />
      </div>
    </>
  );
}
