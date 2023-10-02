import parse from 'html-react-parser';
import Link from 'next/link';
import React from 'react';

type AdditionalParam = {
  title: string;
  body: string;
};

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
};

type BlogListProps = {
  blogs: [Blog];
};

const ArchiveRelative = ({ blogs }: BlogListProps) => {
  const renderBlog = (blog: Blog, index: number) => (
    <Link href={blog.url} key={index}>
      <a>
        <div>
          <h4 {...(blog.$?.title as {})}>{blog.title}</h4>
          {typeof blog.body === 'string' && (
            <div {...(blog.$?.body as {})}>{parse(blog.body.slice(0, 80))}</div>
          )}
        </div>
      </a>
    </Link>
  );

  return <>{blogs?.map(renderBlog)}</>;
};

export default ArchiveRelative;
