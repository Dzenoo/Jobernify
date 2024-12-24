import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  return (
    <ReactMarkdown
      className={cn(className)}
      components={{
        a: ({ href, children, ...props }) => {
          const isInternalLink =
            href && href.startsWith(process.env.NEXT_PUBLIC_CLIENT_URL || '');

          if (isInternalLink) {
            return <Link href={href}>{children}</Link>;
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
