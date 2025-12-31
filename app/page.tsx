import { Container } from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { PostsList } from "@/src/components/PostsList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
import { PostFeature } from "@/src/components/PostFeature";
export default function Home() {
  return (

    <Container>
      <Header />
      <PostFeature />
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <Footer />
    </Container >

  );
}
