import parse from 'html-react-parser';
import ImageNext from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Image, Action } from '../types/action';

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  html_code: string;
  designation: string;
  name: string;
};

type Buckets = {
  title_h3: string;
  description: string;
  call_to_action: Action;
  icon: Image;
  $: AdditionalParam;
};

type BucketProps = {
  title_h2: string;
  description: string;
  buckets: [Buckets];
  $: AdditionalParam;
};

const SectionBucket = ({ section }: { section: BucketProps }) => {
  const renderBucket = (bucket: Buckets, index: number) => (
    <div className="content-section" key={index}>
      {bucket.icon && (
        <ImageNext
          {...(bucket.icon.$?.url as {})}
          src={bucket.icon.url}
          alt="bucket icon"
          width={40}
          height={40}
        />
      )}

      {bucket.title_h3 ? (
        <h3 {...(bucket.$?.title_h3 as {})}>{bucket.title_h3}</h3>
      ) : (
        ''
      )}
      {typeof bucket.description === 'string' && (
        <div {...(bucket.$?.description as {})}>
          {parse(bucket.description)}
        </div>
      )}
      {bucket.call_to_action.title ? (
        <Link
          href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}
        >
          {`${bucket.call_to_action.title} -->`}
        </Link>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <div className="member-main-section">
      <div className="member-head">
        {section.title_h2 && (
          <h2 {...(section.$?.title_h2 as {})}>{section.title_h2}</h2>
        )}
        {section.description && (
          <p {...(section.$?.description as {})}>{section.description}</p>
        )}
      </div>
      <div className="member-section">{section.buckets?.map(renderBucket)}</div>
    </div>
  );
};

export default SectionBucket;
