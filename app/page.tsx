import { Container } from "@/src/components/Container";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { PostsList } from "@/src/components/PostsList";
import { SpinLoader } from "@/src/components/SpinLoader";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (

    <Container>
      <Header />
      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link className="w-full h-full overflow-hidden rounded-xl" href="#">
          <Image className="w-full h-full object-cover object-center group-hover:scale-105 transition" src="/images/bryen_0.png" alt="Bryen 0" width={1200} height={720} priority />
        </Link>
        <div className="flex flex-col gap-4 sm:justify-center">
          <time className="text-sm/tight block text-gray-600" dateTime="2025-12-28">28/12/2025</time>
          <h1 className="text-2xl/tight font-extrabold sm:text-3xl/tight md:text-4xl/tight "><Link href="#">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate quis magni velit!</Link></h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error nemo cumque distinctio accusantium earum nostrum dolorem beatae asperiores dicta. Debitis iure totam praesentium reprehenderit facilis odio illo incidunt officiis non.
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <Footer />
    </Container >

  );
}
