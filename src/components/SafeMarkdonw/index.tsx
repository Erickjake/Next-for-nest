import clsx from "clsx";
import ReactMarkDown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string
}

export function SafeMarkdown({ markdown: markdonw }: SafeMarkdownProps) {
  return (
    <div className={clsx('prose prose-slate w-full max-w-none dark:prose-invert', 'overflow-hidden prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline hover:prose-a:no-underline prose-a-transition', 'prose-img:rounded-xl prose-img:shadow-lg',
      'prose-img:mx-auto', 'md:prose-lg')}>
      <ReactMarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={{
        table: ({ node, ...props }) => {
          if (!node?.children) return ''
          return (
            <div className="overflow-x-auto">
              <table className="w-full min-w-150" {...props} />
            </div>
          )
        }
      }}>{markdonw}</ReactMarkDown>
    </div>
  );
}
