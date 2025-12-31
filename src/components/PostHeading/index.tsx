import { cn } from "@/src/lib/utils";
import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};




export function PostHeading({ children, url, as: Tag = 'h2' }: PostHeadingProps) {
  const heandingClasses = {
    h1: 'text-2xl/tight font-extrabold sm:text-4xl/tight  ',
    h2: 'text-2xl/tight font-bold ',
  }

  const commonClasses = '';
  return (
    <Tag className={cn(heandingClasses[Tag], commonClasses)}>
      <Link href={url} className={cn('group-hover:text-slate-600 transition', commonClasses)}>{children}</Link>
    </Tag>
  );
}
export default PostHeading;
