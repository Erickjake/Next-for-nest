import PostCoverImage from "../PostCoverImage";
import PostHeading from "../PostHeading";

export function PostFeature() {
  const slug = "bryen-0";
  const postLink = `/posts/${slug}`;
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage imageProps={{ src: "/images/bryen_0.png", alt: "Bryen 0", width: 1200, height: 720, priority: true }} linkProps={{ href: postLink }} />
      <div className="flex flex-col gap-4 sm:justify-center">
        <time className="text-sm/tight block text-gray-600" dateTime="2025-12-28">28/12/2025</time>
        <PostHeading url={postLink} as="h1">lorem ipsum dolor sit amet</PostHeading>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error nemo cumque distinctio accusantium earum nostrum dolorem beatae asperiores dicta. Debitis iure totam praesentium reprehenderit facilis odio illo incidunt officiis non.
        </p>
      </div>
    </section>
  );
}
