"use client";

import { FC, useEffect } from "react";
import { RequestStatus, usePostStore } from "@/store/post";
import { useInfiniteScroll } from "@/hooks/use-infinite";
import { setupMockServer } from "@/lib/server";
import { NotFound } from "@/components/NotFound";
import { Loader } from "@/components/Loader";
import { BlogPostCard } from "./BlogPostCard";
import { ERROR_MESSAGES } from "@/common";

setupMockServer();

export const BlogPostsGrid: FC = () => {
  const { posts: allPosts, isLoading, getPosts, hasMore, status } = usePostStore();

  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    loadMore: getPosts,
  });

  useEffect(() => {
    (async () => {
      try {
        await getPosts();
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_POSTS, error);
      }
    })();
  }, []);

  if (isLoading && !allPosts.length) return <Loader />;

  if (status === RequestStatus.SUCCESS && !allPosts.length) return <NotFound />;

  if (!allPosts.length) return null;

  return (
    <div className="py-[30px] grid grid-cols-3 gap-x-8 gap-y-12 max-[1180px]:grid-cols-2 max-[1180px]:gap-x-4 max-[1180px]:gap-y-6 max-sm:grid-cols-1">
      {allPosts.map((post, index) => {
        const isLastPost = index === allPosts.length - 1;

        return (
          <div key={post.id} ref={isLastPost ? lastElementRef : null}>
            <BlogPostCard {...post} />
          </div>
        );
      })}
    </div>
  );
};
