"use client";

import {useEffect, useState} from "react";
import PostComponent from "@/app/(routers)/posts/page";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {getPosts} from "@/app/services/fetch-data";
import {Post} from "@/app/models/data.model";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizes, setPageSizes] = useState(9);
  const [data, setData] = useState<Post[]>([]);
  const [paginatedData, setPaginatedData] = useState<Post[][]>([]);

  useEffect(() => {
    getPosts().then(data => setData(data));
    const paginateData = []
    for (let i = 0; i < data.length; i += pageSizes) {
      paginateData.push(data.slice(i, i + pageSizes))
    }
    setPaginatedData(paginateData);
  }, [data])

  return (
    <>
      <div className="flex flex-wrap h-5/6 justify-center items-center bg-zinc-800">
        <PostComponent posts={paginatedData[currentPage]}/>
      </div>
      <Pagination className="text-white bg-zinc-800 h-1/6">
        <PaginationContent>
          <PaginationItem className={'p-10'}>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            />
          </PaginationItem>
          {paginatedData.map((_, index) => (
            <PaginationItem key={index} className={'p-2'}>
              <PaginationLink
                className={`${index + 1 === currentPage} ? 'text-red-400 text-2xl' : ''`}
                href="#"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem className={'p-10'}>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, paginatedData.length - 1)
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
