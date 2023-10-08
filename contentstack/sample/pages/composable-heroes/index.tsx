import React, { useState, useEffect, useCallback } from 'react';

import GalleryReact from '../../components/gallery';
import { onEntryChange } from '../../core';
import {
  getAllComposableHeros,
  getComposableHeroHomeWorld,
} from '../../core/api';
import { Page, PostPage, PageUrl, Context } from '../../types/pages';

type ComposableHeroesProps = {
  page: Page;
  posts: PostPage;
  archivePost: PostPage;
  pageUrl: PageUrl;
};

const ComposableHeroes = ({
  page,
  posts,
  archivePost,
  pageUrl,
}: ComposableHeroesProps) => {
  const [getBanner, setBanner] = useState(page);

  const fetchData = useCallback(async () => {
    try {
      const bannerRes = await getAllComposableHeros(pageUrl);
      if (!bannerRes) throw new Error('Status code 404');
      setBanner(bannerRes);
      const archivePost = [] as any;
      const posts = [] as any;

      getBanner?.characters?.forEach((superHero: { is_archived: any }) => {
        if (superHero.is_archived) {
          archivePost.push(superHero);
        } else {
          posts.push(superHero);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [pageUrl, getBanner?.characters]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [fetchData]);

  return (
    <>
      <GalleryReact
        data={posts}
        heading={getBanner?.heading}
        description={getBanner?.description}
        showFilter={false}
        showDescription
      />
    </>
  );
};

const getServerSideProps = async (context: Context) => {
  try {
    const page = await getAllComposableHeros(context.resolvedUrl);
    const archivePost = [] as any;
    const posts = [] as any;

    page?.characters?.forEach((superHero: { is_archived: any }) => {
      if (superHero.is_archived) {
        archivePost.push(superHero);
      } else {
        posts.push(superHero);
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

export default ComposableHeroes;
export { getServerSideProps };
