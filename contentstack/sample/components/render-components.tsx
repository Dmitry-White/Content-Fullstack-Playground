import React from 'react';

import { Component, RenderProps } from '../types/component';

import AboutSectionBucket from './about-section-bucket';
import BlogBanner from './blog-banner';
import BlogSection from './blog-section';
import CardSection from './card-section';
import Gallery from './gallery';
import HeroBanner from './hero-banner';
import Section from './section';
import SectionBucket from './section-bucket';
import SectionWithHtmlCode from './section-with-html-code';
import TeamSection from './team-section';

const RenderComponents = (props: RenderProps) => {
  const { pageComponents, blogPost, entryUid, contentTypeUid, locale } = props;

  const renderComponent = (component: Component, key: number) => {
    if (component.hero_banner) {
      return blogPost ? (
        <BlogBanner
          blogBanner={component.hero_banner}
          key={`component-${key}`}
        />
      ) : (
        <HeroBanner banner={component.hero_banner} key={`component-${key}`} />
      );
    }
    if (component.section) {
      return <Section section={component.section} key={`component-${key}`} />;
    }
    if (component.section_with_buckets) {
      return component.section_with_buckets.bucket_tabular ? (
        <AboutSectionBucket
          sectionWithBuckets={component.section_with_buckets}
          key={`component-${key}`}
        />
      ) : (
        <SectionBucket
          section={component.section_with_buckets}
          key={`component-${key}`}
        />
      );
    }
    if (component.from_blog) {
      return (
        <BlogSection fromBlog={component.from_blog} key={`component-${key}`} />
      );
    }
    if (component.section_with_cards) {
      return (
        <CardSection
          cards={component.section_with_cards.cards}
          key={`component-${key}`}
        />
      );
    }
    if (component.section_with_html_code) {
      return (
        <SectionWithHtmlCode
          embedCode={component.section_with_html_code}
          key={`component-${key}`}
        />
      );
    }
    if (component.our_team) {
      return (
        <TeamSection ourTeam={component.our_team} key={`component-${key}`} />
      );
    }
    if (component?.superheroes) {
      return (
        <Gallery
          key={`component-${key}`}
          data={component?.superheroes?.character}
          heading={undefined}
          showFilter={false}
          showDescription={false}
          description={component?.description}
        />
      );
    }
  };

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.map(renderComponent)}
    </div>
  );
};

export default RenderComponents;
