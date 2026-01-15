import { PostsList } from "@/src/components/PostsList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
import { PostFeature } from "@/src/components/PostFeature";
export default function Home() {
  return (
    <>

      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostFeature />
      </Suspense>

      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostsList />
      </Suspense>

    </>


  );
}
