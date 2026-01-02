import { formatDateTime, formatDistanceToNow } from "@/src/utils/format-datetime";
import PostHeading from "../PostHeading";

type PostSummaryProps = {
  postHeading: 'h1' | 'h2'
  postLink: string
  createdAt: string
  title: string
  excerpt?: string
}
export function PostSummary({ postHeading, postLink, createdAt, title, excerpt }: PostSummaryProps) {

  return (
    < div className="flex flex-col gap-4 sm:justify-center" >
      <time className="text-sm/tight block text-gray-600" dateTime={createdAt} title={formatDistanceToNow
        (createdAt)}>{formatDateTime
          (createdAt)}</time>
      <PostHeading url={postLink} as={postHeading}>{title}</PostHeading>
      <p>
        {excerpt}
      </p>

    </div >
  );
}
