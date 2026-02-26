import { PostFeatured } from "@/src/components/PostFeature";
import { PostsList } from "@/src/components/PostsList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
export default function Home() {
  return (
    <>

      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostsList />
      </Suspense>

    </>


  );
}
