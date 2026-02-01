import { Metadata } from "next";
import { ManagePostForm } from "@/src/components/admin/ManagePostForm";

type PageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Editar Post",
}
export default function AdminPostIdPage({ params }: PageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">New Post</h1>
      <ManagePostForm />
    </div>
  );
}
