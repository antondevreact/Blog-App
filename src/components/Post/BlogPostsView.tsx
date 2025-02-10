import { FC } from "react";
import { Container } from "@/components/Container";
import { SearchBar } from "@/components/SearchBar";
import { BlogPostsGrid } from "./BlogPostsGrid";

export const BlogPostsView: FC = () => (
  <Container className="py-0 max-lg:px-8">
    <h3 className="font-semibold text-2xl pb-2 max-[450px]:text-xl">
      All blog posts
    </h3>
    <SearchBar />
    <BlogPostsGrid />
  </Container>
);
