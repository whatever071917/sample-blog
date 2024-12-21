import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {Post} from "@/app/models/data.model";

export default function PostComponent({posts}: { posts: Post[] }) {
    return (
        posts.map((post: Post) => {
            return (
                <>
                    <Card className={'w-1/4 h-44 m-5'}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{post.body}</p>
                        </CardContent>
                    </Card>
                </>
            )
        })

    )
}
