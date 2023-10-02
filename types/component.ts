import { Action, Image } from './action';

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
};

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
};

type BucketList = [
  BucketArray: {
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: AdditionalParam;
  },
];

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: AdditionalParam;
  },
];

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
};

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  },
];

type Widget = {
  title_h2: string;
  type?: string;
  $: AdditionalParam;
};

type Component = {
  description: any;
  superheroes: any;
  hero_banner: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: AdditionalParamProps;
  our_team?: TeamProps;
  widget?: Widget;
};

type SectionWithBucket = {
  bucket_tabular: boolean;
  title_h2: string;
  buckets: BucketList;
  description: string;
  $: AdditionalParam;
};

type Cards = {
  cards: Card;
};

type Banner = {
  banner_title: string;
  banner_description: string;
  bg_color: string;
  call_to_action: Action;
  banner_image: Image;
  text_color: string;
  $: AdditionalParam;
};

type AdditionalParamProps = {
  html_code_alignment: string;
  title: string;
  $: AdditionalParam;
  description: string;
  html_code: string;
};

type SectionProps = {
  title_h2: String;
  description: string;
  call_to_action: Action;
  image: Image;
  image_alignment: string;
  $: AdditionalParam;
};

type TeamProps = {
  title_h2: string;
  description: string;
  $: AdditionalParam;
  employees: [Employee];
};

type FeaturedBlogData = {
  title_h2: string;
  view_articles: Article;
  featured_blogs: FeaturedBlog;
  $: AdditionalParam;
};

type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents: Component[];
};

export {
  // @ts-ignore
  Component, // @ts-ignore
  SectionWithBucket, // @ts-ignore
  Cards, // @ts-ignore// @ts-ignore
  Banner, // @ts-ignore
  AdditionalParamProps, // @ts-ignore
  SectionProps, // @ts-ignore
  TeamProps, // @ts-ignore
  FeaturedBlogData, // @ts-ignore
  RenderProps,
};
