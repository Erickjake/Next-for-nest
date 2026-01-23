import PostListAdminPage from "@/src/components/PostListAdmin";
import SpinLoader from "@/src/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default function AdminPostPage() {

  return (
    <Suspense fallback={<SpinLoader />}>
      <PostListAdminPage />
    </Suspense>
  )
}
