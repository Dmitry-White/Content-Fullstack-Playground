import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import ArchiveRelative from '../../components/archive-relative';
import BlogList from '../../components/blog-list';
import RenderComponents from '../../components/render-components';
import { onEntryChange } from '../../core';
import { getPageRes, getBlogListRes } from '../../core/api';
import { Page, PostPage, PageUrl, Context } from '../../types/pages';

type BlogProps = {
  page: Page;
  posts: PostPage;
  archivePost: PostPage;
  pageUrl: PageUrl;
};

const Blog = ({ page, posts, archivePost, pageUrl }: BlogProps) => {
  const [getBanner, setBanner] = useState(page);

  const fetchData = useCallback(async () => {
    try {
      const bannerRes = await getPageRes(pageUrl);
      if (!bannerRes) throw new Error('Status code 404');
      setBanner(bannerRes);
    } catch (error) {
      console.error(error);
    }
  }, [pageUrl]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [fetchData]);

  return (
    <>
      {getBanner.page_components ? (
        <RenderComponents
          pageComponents={getBanner.page_components}
          blogPost
          contentTypeUid="page"
          entryUid={getBanner.uid}
          locale={getBanner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className="blog-container">
        <div className="blog-column-left">
          {posts ? (
            posts.map((blogList, index) => (
              <BlogList bloglist={blogList} key={index} />
            ))
          ) : (
            <Skeleton height={400} width={400} count={3} />
          )}
        </div>
        <div className="blog-column-right">
          {getBanner && getBanner.page_components[1].widget && (
            <h2>{getBanner.page_components[1].widget.title_h2}</h2>
          )}
          {archivePost ? (
            <ArchiveRelative blogs={archivePost} />
          ) : (
            <Skeleton height={600} width={300} />
          )}
        </div>
      </div>
    </>
  );
};

const getServerSideProps = async (context: Context) => {
  try {
    const page = await getPageRes(context.resolvedUrl);
    const result: PostPage = await getBlogListRes();

    const archivePost = [] as any;
    const posts = [] as any;

    result.forEach((blogs) => {
      if (blogs.is_archived) {
        archivePost.push(blogs);
      } else {
        posts.push(blogs);
      }
    });

    return {
      props: {
        pageUrl: context.resolvedUrl,
        page,
        posts,
        archivePost,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Blog;
export { getServerSideProps };
