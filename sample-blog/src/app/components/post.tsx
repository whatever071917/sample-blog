"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {Post} from "@/app/models/data.model";
import {useRouter} from "next/router";

export default function PostComponent({posts}: { posts: Post[] }) {
  const router = useRouter();
  const goPostDetail = (postId?: number) => {
    router.push(`/posts/${postId}`);
  }
  return (
    posts.map((post: Post, index: number) => {
      return (
        <>
          <Card key={index} className={'w-1/4 h-44 m-5'} onClick={() => goPostDetail(post.id)}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={'truncate text-sm'}>{post.body}</p>
            </CardContent>
          </Card>
        </>
      )
    })
  )
}
