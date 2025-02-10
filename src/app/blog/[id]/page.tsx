import { PostContent } from "@/components/Post/PostContent";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostContent postId={id} />;
}
