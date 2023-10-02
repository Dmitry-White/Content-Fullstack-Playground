import parse from 'html-react-parser';
import moment from 'moment';
import ImageNext from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Image } from '../types/action';

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
  title: {};
  title_h2: string;
  body: string;
  date: string;
};

type Author = {
  title: string;
  $: AdditionalParam;
};

type BloglistProps = {
  body: string;
  url: string;
  featured_image: Image;
  title: string;
  date: string;
  author: [Author];
  $: AdditionalParam;
};

const BlogList = ({ bloglist }: { bloglist: BloglistProps }) => {
  const body: string = bloglist.body && bloglist.body.substr(0, 300);
  const stringLength = body?.lastIndexOf(' ');
  const parsedBody = `${body?.substr(
    0,
    Math.min(body.length, stringLength),
  )}...`;

  return (
    <div className="blog-list">
      {bloglist.featured_image && (
        <Link href={bloglist.url}>
          <a>
            <ImageNext
              className="blog-list-img"
              src={bloglist.featured_image.url}
              alt="blog img"
              {...(bloglist.featured_image.$?.url as {})}
              width={230}
              height={290}
            />
          </a>
        </Link>
      )}
      <div className="blog-content">
        {bloglist.title && (
          <Link href={bloglist.url}>
            <a>
              <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
            </a>
          </Link>
        )}
        <p>
          <strong {...(bloglist.$?.date as {})}>
            {moment(bloglist.date).format('ddd, MMM D YYYY')}
          </strong>
          ,{' '}
          <strong {...bloglist.author[0].$?.title}>
            {bloglist.author[0].title}
          </strong>
        </p>
        <div {...(bloglist.$?.body as {})}>{parse(parsedBody)}</div>
        {bloglist.url ? (
          <Link href={bloglist.url}>
            <a>
              <span>{'Read more -->'}</span>
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default BlogList;
