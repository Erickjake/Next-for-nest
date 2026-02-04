import { ManagePostForm } from "@/src/components/admin/ManagePostForm";
import { PublicPost } from "@/src/dto/post/dto";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Editar Post",
}
export default async function AdminPostNewPage({ postPublic }: { postPublic?: PublicPost }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">New Post</h1>
      <ManagePostForm postPublic={postPublic} />
    </div>
  );
}
