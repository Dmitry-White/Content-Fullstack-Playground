import ImageNext from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Image, Action } from '../types/action';

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
};

type Banner = {
  bg_color: string;
  text_color: string;
  banner_title: string;
  banner_description: string;
  call_to_action: Action;
  banner_image: Image;
  $: AdditionalParam;
};

type BannerProps = {
  banner: Banner;
};

const HeroBanner = (props: BannerProps) => {
  const banner = props.banner;

  return (
    <div
      className="hero-banner"
      style={{
        background: banner?.bg_color ? banner.bg_color : '',
      }}
    >
      <div
        className="home-content"
        style={{
          color: banner?.text_color ? banner.text_color : '#000',
        }}
      >
        {banner.banner_title && (
          <h1 className="hero-title" {...(banner.$?.banner_title as {})}>
            {banner.banner_title}
          </h1>
        )}
        {banner.banner_description ? (
          <p
            className="hero-description "
            style={{
              color: banner?.text_color ? banner.text_color : '#222',
            }}
            {...(banner.$?.banner_description as {})}
          >
            {banner?.banner_description}
          </p>
        ) : (
          ''
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <Link href={banner?.call_to_action.href}>
            <a className="btn tertiary-btn" {...banner.call_to_action.$?.title}>
              {banner?.call_to_action.title}
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
      {banner.banner_image ? (
        <ImageNext
          alt={banner.banner_image.filename}
          src={banner.banner_image.url}
          {...(banner.banner_image.$?.url as {})}
          width={540}
          height={410}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default HeroBanner;
