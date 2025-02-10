import { fetchPosts, fetchPostById } from "@/actions/post";
import { IGetPostsResponse, IPost } from "@/interface/post";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ERROR_MESSAGES } from "@/common";
import { DEFAULT_PAGE, POSTS_LIMIT } from "./constants";

export enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  REJECT = "reject",
}

interface IPostState {
  posts: IPost[];
  post: IPost | null;
  searchQuery: string;
  hasMore: boolean;
  status: RequestStatus;
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  getPosts: (reset?: boolean) => Promise<void>;
  getPostById: (postId: string) => Promise<void>;
}

export const usePostStore = create(
  immer<IPostState>((set, get) => ({
    posts: [],
    post: null,
    searchQuery: "",
    hasMore: true,
    status: RequestStatus.IDLE,
    isLoading: false,
    error: null,

    setSearchQuery: (query) => {
      set((state) => {
        state.searchQuery = query;
      });
      get().getPosts(true);
    },

    getPosts: async (reset = false) => {
      const { status, posts: allPosts, searchQuery } = get();

      if (status === RequestStatus.PENDING) return;

      set((state) => {
        state.status = RequestStatus.PENDING;
        state.isLoading = true;
        if (reset) state.posts = [];
      });

      try {
        const page = reset
          ? DEFAULT_PAGE
          : Math.ceil(allPosts.length / POSTS_LIMIT) + 1;
        const { posts }: IGetPostsResponse = await fetchPosts({
          page,
          limit: POSTS_LIMIT,
          searchQuery,
        });

        set((state) => {
          state.posts = reset ? posts : [...state.posts, ...posts];
          state.hasMore = posts.length === POSTS_LIMIT;
          state.status = RequestStatus.SUCCESS;
        });
      } catch (error) {
        set((state) => {
          state.status = RequestStatus.REJECT;
          state.error = ERROR_MESSAGES.FETCH_POSTS;
        });

        console.error(ERROR_MESSAGES.FETCH_POSTS, error);
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },

    getPostById: async (postId) => {
      const { status } = get();

      if (status === RequestStatus.PENDING) return;

      set((state) => {
        state.status = RequestStatus.PENDING;
        state.isLoading = true;
        state.error = null;
      });

      try {
        const { post } = await fetchPostById({ postId });
        set((state) => {
          state.post = post;
          state.status = RequestStatus.SUCCESS;
        });
      } catch (error) {
        set((state) => {
          state.status = RequestStatus.REJECT;
          state.post = null;
          state.error = ERROR_MESSAGES.FETCH_POST;
        });

        console.error(ERROR_MESSAGES.FETCH_POST, error);
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
  }))
);
