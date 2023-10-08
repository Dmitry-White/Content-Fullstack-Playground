import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import RenderComponents from '../components/render-components';
import { onEntryChange } from '../core';
import { getPageRes } from '../core/api';
import { Props, Context } from '../types/pages';

const Home = (props: Props) => {
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
  }, [fetchData]);

  return getEntry ? (
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

const getServerSideProps = async (context: Context) => {
  try {
    const entryRes = await getPageRes(context.resolvedUrl);
    return {
      props: {
        entryUrl: context.resolvedUrl,
        page: entryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
export { getServerSideProps };
