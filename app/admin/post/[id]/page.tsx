import { Metadata } from "next";
import { ManagePostForm } from "@/src/components/admin/ManagePostForm";
import { findPostByIdAdmin } from "@/src/lib/post/queries/admin";
import { notFound } from "next/navigation";
import { makePublicPostFromDb } from "@/src/dto/post/dto";


type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Editar Post",
}
export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params
  const post = await findPostByIdAdmin(id).catch(() => undefined);
  if (!post) notFound();
  const publicPost = makePublicPostFromDb(post);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar Post</h1>
      <ManagePostForm mode="update" publicPost={publicPost} />
    </div>
  );
}
