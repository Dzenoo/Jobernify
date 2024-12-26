import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type MarkdownRendererProps = {
  content: string;
  className?: string;
  customStyles?: {
    p?: string;
    ul?: string;
    li?: string;
    ol?: string;
    a?: string;
    strong?: string;
  };
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
  customStyles = {},
}) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSanitize]}
      className={cn('markdown', className)}
      components={{
        p: ({ node, ...props }) => (
          <p className={cn(customStyles.p)} {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className={cn(customStyles.ul)} {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className={cn(customStyles.ol)} {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className={cn(customStyles.li)} {...props} />
        ),
        a: ({ href, children, ...props }) => {
          const isInternalLink =
            href && href.startsWith(process.env.NEXT_PUBLIC_CLIENT_URL || '');

          if (isInternalLink) {
            return (
              <Link href={href} className={cn(customStyles.a)}>
                {children}
              </Link>
            );
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(customStyles.a)}
              {...props}
            >
              {children}
            </a>
          );
        },
        strong: ({ node, ...props }) => (
          <strong className={cn(customStyles.strong)} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
