import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import { CodeBlock } from "./CodeBlock";

function CodeRenderer({ className, children }: ComponentProps<"code">) {
  const isBlock = /language-/.test(className ?? "");
  const text = String(children).replace(/\n$/, "");
  if (!isBlock && !text.includes("\n")) {
    return <code>{children}</code>;
  }
  const language = className?.replace("language-", "") ?? "code";
  return <CodeBlock code={text} label={language} />;
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-dossier prose prose-lg max-w-none prose-headings:font-[350] prose-a:no-underline prose-a:decoration-2 hover:prose-a:underline">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeRenderer,
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
