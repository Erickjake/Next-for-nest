import { postRepository } from "@/src/repositories/post";
import PostCoverImage from "../PostCoverImage";
import PostHeading from "../PostHeading";

export async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {posts.map(post => {
        const postLink = `/posts/${post.slug}`;
        return (

          <div key={post.id} className="flex flex-col gap-4 group">
            < PostCoverImage imageProps={{ src: post.coverImageUrl, alt: post.title, width: 1200, height: 720 }
            } linkProps={{
              href: postLink
            }} />
            < div className="flex flex-col gap-4 sm:justify-center" >
              <time className="text-sm/tight block text-gray-600" dateTime={post.createdAt}>28/12/2025</time>
              <PostHeading url={postLink} as="h2">{post.title}</PostHeading>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error nemo cumque distinctio accusantium earum nostrum dolorem beatae asperiores dicta. Debitis iure totam praesentium reprehenderit facilis odio illo incidunt officiis non.
              </p>
            </div >
          </div >
        )
      })}
    </div >
  );
}
