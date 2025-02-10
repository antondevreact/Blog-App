import { createServer, Response } from "miragejs";
import { posts } from "@/mock/posts";
import { DEFAULT_PAGE, POSTS_LIMIT } from "@/store/constants";
import { ERROR_MESSAGES } from "@/common";
import { IPost } from "@/interface/post";

export function setupMockServer() {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/posts", (schema, request) => {
        try {
          const {
            page = DEFAULT_PAGE,
            limit = POSTS_LIMIT,
            search,
          } = request.queryParams;

          const pageNumber = Number(page) || DEFAULT_PAGE;
          const limitNumber = Number(limit) || POSTS_LIMIT;

          const searchQuery =
            (Array.isArray(search) ? search[0] : search)?.toLowerCase() || "";

          const fieldsToSearch = ({ title, description, author, tags }: IPost) =>
            [title, description, author, ...(tags || [])];

          const filteredPosts = searchQuery
            ? posts.filter((post) =>
              fieldsToSearch(post).some((field) => field?.toLowerCase().includes(searchQuery))
            )
            : posts;

          const start = (pageNumber - 1) * limitNumber;
          const paginatedPosts = filteredPosts.slice(
            start,
            start + limitNumber
          );

          return paginatedPosts;
        } catch (error) {
          console.error(error);
          return new Response(
            500,
            {},
            { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }
          );
        }
      });

      this.get("/posts/:id", (schema, request) => {
        const { id: postId } = request.params;
        const post = posts.find(({ id }) => id === Number(postId));

        return post ?? new Response(404, {}, { error: ERROR_MESSAGES.POST_NOT_FOUND });
      });

      this.namespace = "";
      this.passthrough();
    },
  });
}
