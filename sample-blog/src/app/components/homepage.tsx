import {getPosts} from "@/app/services/fetch-data";
import PostComponent from "@/app/components/post";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {Post} from "@/app/models/data.model";

export default async function Homepage() {
    const data = await getPosts();
    const paginatedData: Post[] = [];
    for (let i = 0; i < data.length; i += 9) {
        paginatedData.push(data.slice(i, i + 9)[0]);
    }
    return (
        <>
            <div className={'flex flex-wrap h-5/6 justify-center align-items-center'}>
                <PostComponent
                    posts={paginatedData}
                />
            </div>
            <Pagination className={'h-1/6 text-white'}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    {paginatedData.map((post: Post, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#">{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )

}
