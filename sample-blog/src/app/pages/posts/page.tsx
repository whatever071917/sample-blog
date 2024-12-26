"use client";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type {Post} from "@/app/models/data.model";

const PostDetail = dynamic<any>(() => import("@/app/pages/posts/[id]"), {ssr: false});

const DEFAULT_PAGE_SIZE = 9;
const INITIAL_PAGE = 1;

export default function PostComponent(props: {posts: Post[]}) {
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [isPostDetailVisible, setShowPostDetail] = useState<boolean>(true);
  const [paginatedData, setPaginatedData] = useState<Post[][]>([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [posts, setPosts] = useState<Post[]>([]);

  const paginate = (data: Post[], pageSize: number): Post[][] =>
    Array.from(
      {length: Math.ceil(data.length / pageSize)},
      (_, index) => data.slice(index * pageSize, index * pageSize + pageSize)
    );

  useEffect(() => {
    setPosts(props.posts || []);
    const paginated = paginate(props.posts, DEFAULT_PAGE_SIZE);
    setPaginatedData(paginated);
  }, [props.posts]);

  const handlePostClick = (id?: number, userId?: number) => {
    if (!id) return;
    setSelectedPostId(id);
    setSelectedUserId(userId);
    setShowPostDetail(false);
  };

  const renderPosts = () =>
    paginatedData[currentPage]?.map((post) => (
      <Card
        key={post.id}
        className="w-1/4 h-44 m-5 cursor-pointer bg-white rounded-md"
        onClick={() => handlePostClick(post.id, post.userId)}
      >
        <CardHeader>
          <CardTitle className="font-bold p-2 text-lg">
            <div className="flex justify-center items-center">{post?.title}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm p-2">{post?.body}</p>
        </CardContent>
      </Card>
    ));

  const renderPagination = () => (
    <Pagination className="text-white h-20">
      <PaginationContent>
        <PaginationItem className="p-10">
          <PaginationPrevious
            href="#"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
        </PaginationItem>
        {paginatedData.map((_, index) => (
          <PaginationItem key={index} className="p-2">
            <PaginationLink
              className={
                index + 1 === currentPage ? "text-red-400 text-2xl" : ""
              }
              href="#"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="p-10">
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, paginatedData.length)
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <>
      {isPostDetailVisible ? (
        <>
          <div className="flex flex-wrap justify-center items-center">
            {renderPosts()}
          </div>
          {renderPagination()}
        </>
      ) : (
        <div>
          <div>
            <Button className="text-white" onClick={() => setShowPostDetail(true)}>
              <ChevronLeft/>
              Back
            </Button>
          </div>
          <div>
            <PostDetail id={selectedPostId} userId={selectedUserId}/>
          </div>
        </div>
      )}
    </>
  );
}
