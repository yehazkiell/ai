"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown = ({ content, className }: MarkdownProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn("prose prose-invert max-w-none break-words text-sm md:text-base", className)}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          return (
            <code
              className={cn(
                "bg-neutral-800 px-1.5 py-0.5 rounded text-blue-400 font-mono text-sm",
                !inline && "block p-4 my-2 overflow-x-auto",
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        ul: ({ children }) => <ul className="list-disc ml-4 space-y-1 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-4 space-y-1 my-2">{children}</ol>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
