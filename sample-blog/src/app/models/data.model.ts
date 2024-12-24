export interface Post {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
    username?: string;
}

export interface User {
    id?: number;
    name?: string;
    phone?: string;
    username?: string;
    email?: string;
}

export interface Comment {
    body?: string;
    email?: string;
    name?: string;
    id?: number;
    postId?: number;
}
