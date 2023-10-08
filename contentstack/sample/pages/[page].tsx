import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import RenderComponents from '../components/render-components';
import { onEntryChange } from '../core';
import { getPageRes } from '../core/api';
import { Props } from '../types/pages';

const Page = (props: Props) => {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);

  const fetchData = useCallback(async () => {
    try {
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error('Status code 404');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }, [entryUrl]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [page, fetchData]);

  return getEntry.page_components ? (
    <RenderComponents
      pageComponents={getEntry.page_components}
      contentTypeUid="page"
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
};

const getServerSideProps = async ({ params }: any) => {
  try {
    const entryUrl = params.page.includes('/')
      ? params.page
      : `/${params.page}`;
    const entryRes = await getPageRes(entryUrl);
    if (!entryRes) throw new Error('404');

    return {
      props: {
        entryUrl: entryUrl,
        page: entryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Page;
export { getServerSideProps };
