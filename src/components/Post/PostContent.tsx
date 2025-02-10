"use client";

import { FC, useEffect } from "react";
import Image from "next/image";
import { setupMockServer } from "@/lib/server";
import { RequestStatus, usePostStore } from "@/store/post";
import { Loader } from "@/components/Loader";
import { Tags } from "@/components/Tags";
import { NotFound } from "@/components/NotFound";
import { ERROR_MESSAGES } from "@/common";

interface IProps {
  postId: string;
}

setupMockServer();

export const PostContent: FC<IProps> = ({ postId }) => {
  const { post: currentPost, getPostById, isLoading, status } = usePostStore();

  useEffect(() => {
    (async () => {
      try {
        await getPostById(postId);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_POST, error);
      }
    })();
  }, [postId]);

  if (isLoading && !currentPost) return <Loader />;

  if (status === RequestStatus.SUCCESS && !currentPost) return <NotFound />;

  if (!currentPost) return null;

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Image
          src={currentPost.image}
          alt={currentPost.title}
          className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105 max-[450px]:h-[300px]"
        />
      </div>
      <div className="flex flex-col gap-4 max-sm:items-center">
        <div className="flex flex-wrap items-center gap-2 text-lg text-gray-500 max-[450px]:text-sm">
          <span className="text-customPurple">{currentPost.date}</span>
          <span className="text-gray-400">•</span>
          <span>Author: {currentPost.author}</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text max-sm:text-2xl max-[450px]:text-xl">
          {currentPost.title}
        </h1>
        <p className="text-lg leading-relaxed text-lightGray max-sm:text-sm">
          {currentPost.description}
        </p>
        <Tags tags={currentPost.tags} />
      </div>
    </div>
  );
};
