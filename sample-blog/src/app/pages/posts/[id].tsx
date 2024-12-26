import {Comment, Post} from "@/app/models/data.model";
import {useEffect, useState} from "react";
import {getPostComments, getPostDetail, getUseDetail} from "@/app/services/fetch-data";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {Progress} from "@/components/ui/progress";

// Constants for CSS classnames
const cardClass = "w-full h-full m-5 cursor-pointer bg-white rounded-md";
const cardHeaderClass = "flex align-items-center";
const cardTitleClass = "font-bold flex flex-col text-lg p-2";

const DEFAULT_PAGE_SIZE = 9;
const INITIAL_PAGE = 1;

export default function PostDetail(postProps: { id: number | undefined; userId: number | undefined }) {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [paginatedComments, setPaginatedComments] = useState<Comment[][]>([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [progress, setProgress] = useState(10);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    if (postProps.id === undefined || postProps.userId === undefined) return;
    try {
      const postData = await getPostDetail(postProps.id);
      const userData = await getUseDetail(postProps.userId);
      const fetchedComments = await getPostComments(postProps.id);
      setPost({
        ...postData,
        username: userData.username,
      });
      const paginated = paginate(fetchedComments, DEFAULT_PAGE_SIZE);
      setPaginatedComments(paginated);
      setTimeout(() => {
        setProgress(100);
        setIsLoading(false);
      },500)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paginate = (data: Comment[], pageSize: number): Comment[][] =>
    Array.from(
      {length: Math.ceil(data.length / pageSize)},
      (_, index) => data.slice(index * pageSize, index * pageSize + pageSize)
    );

  useEffect(() => {
    fetchData();
  }, []);

  const renderPagination = () => (
    <Pagination className="text-white h-20">
      <PaginationContent>
        <PaginationItem className="p-10">
          <PaginationPrevious
            href="#"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
        </PaginationItem>
        {paginatedComments.map((_, index) => (
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
                Math.min(prev + 1, paginatedComments.length)
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  const renderCommentList = () => {
    return (
      <>
        <h3 className={'font-bold pt-4 pl-4 text-white'}>Comments:</h3>
        {paginatedComments[currentPage - 1]?.map((comment) => (
          <Card key={comment?.id} className={cardClass}>
            <CardHeader className={cardHeaderClass}>
              <CardTitle className={cardTitleClass}>
                <div className="text-lg">Author: {comment?.email}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm p-2">{comment?.body}</p>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  const renderPost = () => {
    return (
      <Card key={post?.id} className={cardClass}>
        <CardHeader className={cardHeaderClass}>
          <CardTitle className={cardTitleClass}>
            <div className="flex">Title: {post?.title}</div>
            <div className="text-lg">Author: {post?.username}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm p-2">{post?.body}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {isLoading &&
          <Progress value={progress} className="w-[60%]"/>
      }
      {!isLoading &&
          <div>
              <div className="flex flex-wrap justify-center items-center h-1/3 w-full">
                {renderPost()}
              </div>
              <div className={'h-2/3 w-full'}>
                {renderCommentList()}
                {renderPagination()}
              </div>
          </div>
      }
    </>
  )
    ;
}
