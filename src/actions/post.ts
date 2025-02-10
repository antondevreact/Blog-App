import axios from "axios";
import {
  IGetPostByIdRequest,
  IGetPostByIdResponse,
  IGetPostsRequest,
  IGetPostsResponse,
} from "@/interface/post";

export const fetchPosts = async ({
  page,
  limit,
  searchQuery = "",
}: IGetPostsRequest): Promise<IGetPostsResponse> => {
  try {
    const response = await axios.get(`/api/posts`, {
      params: { page, limit, search: searchQuery },
    });

    return {
      posts: response.data,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);

    return { posts: [] };
  }
};

export const fetchPostById = async ({
  postId,
}: IGetPostByIdRequest): Promise<IGetPostByIdResponse> => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);

    return {
      post: response.data,
    };
  } catch (error) {
    console.error("Error fetching post:", error);

    return { post: null };
  }
};
