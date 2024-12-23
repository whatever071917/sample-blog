"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {Post} from "@/app/models/data.model";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function PostComponent(props: { posts: Post[] }) {
  const router = useRouter();

  const goPostDetail = (id?: number) => {
    if (!id) return;
    router.push(`./${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {props?.posts?.map((post: Post) => (
        <Card
          key={post.id}
          className="w-1/4 h-44 m-5 cursor-pointer bg-white rounded-md h-full"
          onClick={() => goPostDetail(post.id)}
        >
          <CardHeader className={'flex align-items-center'}>
            <Image src={'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'} width={70} height={150}  alt={'Image'}/>
            <CardTitle className="font-bold flex items-center text-lg">
              <div className={'flex align-i justify-center items-center'}>
                {post.title}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{post.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
