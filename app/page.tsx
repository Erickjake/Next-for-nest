import { PostsList } from "@/src/components/PostsList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
import { PostFeature } from "@/src/components/PostFeature";
export default function Home() {
  return (
    <>

      <Suspense fallback={<SpinLoader />}>
        <PostFeature />
      </Suspense>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

    </>


  );
}
