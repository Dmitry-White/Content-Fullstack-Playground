import parse from 'html-react-parser';
import React, { useState, useEffect, useCallback } from 'react';

import { onEntryChange } from '../../core';
import { getComposableHeroSingleRes } from '../../core/api';
import { Page, SuperHeroPosts, PageUrl } from '../../types/pages';

type SuperHerosPostProps = {
  superHeroPost: SuperHeroPosts;
  page: Page;
  pageUrl: PageUrl;
};

type HomeWorld = {
  title: string | undefined;
  image: {
    url: string | undefined;
    $: { url: {} };
    filename: string;
  };
};

const SuperHerosPost = ({
  superHeroPost,
  page,
  pageUrl,
}: SuperHerosPostProps) => {
  const [getPost, setPost] = useState(superHeroPost);

  const fetchData = useCallback(async () => {
    try {
      const entryRes = await getComposableHeroSingleRes(pageUrl);
      if (!entryRes) throw new Error('Status: ' + 404);
      setPost(entryRes);
    } catch (error) {
      console.error(error);
    }
  }, [pageUrl]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [fetchData]);

  const postData = getPost;

  const renderHomeWorldItem = (homeWorld: HomeWorld, indx: {}) => (
    <div key={indx.toString()} className="mb-3">
      {homeWorld?.title ? (
        <p>
          <strong>{homeWorld?.title}</strong>
        </p>
      ) : (
        ''
      )}
      {homeWorld?.image?.url ? (
        <img
          className="superHero-logo-img img-fluid mb-3"
          src={homeWorld?.image?.url}
          alt={homeWorld?.image?.filename}
          {...(homeWorld?.image.$?.url as {})}
        />
      ) : (
        ''
      )}
      <hr />
    </div>
  );

  const renderInfo = () => (
    <div className="col-12">
      {postData?.title ? (
        <h2 className="mb-3" {...(postData.$?.title as {})}>
          {postData?.title}
        </h2>
      ) : (
        ''
      )}
      {postData?.description ? (
        <div {...(postData.$?.description as {})}>
          {parse(postData?.description)}
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const renderHomeWorld = () => (
    <div className="col-12">
      {postData?.home_world?.map(renderHomeWorldItem)}
      {postData?.contact_info?.email ? (
        <p {...postData?.contact_info.$?.email}>
          <strong>Email :</strong> {postData?.contact_info?.email}
        </p>
      ) : (
        ''
      )}
      {postData?.contact_info?.phone ? (
        <p {...postData?.contact_info.$?.phone}>
          <strong>Phone :</strong> {postData?.contact_info?.phone}
        </p>
      ) : (
        ''
      )}
      {postData?.powers ? (
        <p {...(postData.$?.powers as {})}>
          <strong>Power :</strong> {postData?.powers}
        </p>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <>
      <div className="container superHero-detail-container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            {postData?.image?.url ? (
              <img
                className="img-fluid"
                src={postData?.image?.url + '?height=800'}
                alt={postData?.image?.filename}
                {...(postData?.image.$?.url as {})}
              />
            ) : (
              ''
            )}
          </div>
          <div className="col-md-12 col-lg-4 mt-5 ps-md-5">
            <div className="row">
              {renderInfo()}
              {renderHomeWorld()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getServerSideProps = async ({ params }: any) => {
  try {
    const posts = await getComposableHeroSingleRes(
      `/composable-heroes/${params.post}`,
    );
    if (!posts) throw new Error('404');

    return {
      props: {
        pageUrl: `/composable-heroes/${params.post}`,
        superHeroPost: posts,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default SuperHerosPost;
export { getServerSideProps };
