import {Post, User, Comment} from "@/app/models/data.model";

export async function getPosts(): Promise<Post[]> {
    return await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
}

export async function getUseDetail(userId?: number): Promise<User> {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json())
}

export async function getPostDetail(postId?: number): Promise<Post> {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json())
}

export async function getPostComments(postId?: number): Promise<Comment[]> {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json())
}
