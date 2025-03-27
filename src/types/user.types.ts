export interface User {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
}

export interface FetchUserResponse {
    per_page: number;
    page: number;
    data: User[];
    total: number;
    total_pages: number;
}

export interface UpdateUserResponse {
    email?:string,
    firstName?:string,
    lastName?:string,
    updatedAt?:string
}