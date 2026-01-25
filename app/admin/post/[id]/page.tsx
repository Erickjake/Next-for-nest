import AdminPostContent from "@/src/components/admin/AdminPostContent";
import { Suspense } from "react";

type PageProps = {
  params: { id: string };
};

export default function AdminPostIdPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Carregando post...</div>}>
      <AdminPostContent id={params.id} />
    </Suspense>
  );
}
