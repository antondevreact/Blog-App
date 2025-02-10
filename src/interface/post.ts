import { StaticImageData } from "next/image";

export interface IPost {
  id: number;
  image: StaticImageData;
  date: string;
  author: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface IGetPostsRequest {
  page: number;
  limit: number;
  searchQuery?: string;
}

export interface IGetPostByIdRequest {
  postId: string;
}
export interface IGetPostByIdResponse {
  post: IPost | null;
}

export interface IGetPostsResponse {
  posts: IPost[];
}
