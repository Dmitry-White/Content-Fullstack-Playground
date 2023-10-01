import React, { useState, useEffect } from 'react';

import {
  HeaderProps,
  FooterProps,
  PageProps,
  Posts,
  ChilderenProps,
  Entry,
  NavLinks,
  Links,
} from '../types/layout';

import DevTools from './devtools';
import Footer from './footer';
import Header from './header';

type LayoutProps = {
  header: HeaderProps;
  footer: FooterProps;
  page: PageProps;
  blogPost: Posts;
  blogList: Posts;
  entries: Entry;
  children: ChilderenProps;
};

const Layout = ({
  header,
  footer,
  page,
  blogPost,
  blogList,
  entries,
  children,
}: LayoutProps) => {
  const [getLayout, setLayout] = useState({ header, footer });
  const jsonObj: any = { header, footer };
  page && (jsonObj.page = page);
  blogPost && (jsonObj.blog_post = blogPost);
  blogList && (jsonObj.blog_post = blogList);

  const buildNavigation = (ent: Entry, hd: HeaderProps, ft: FooterProps) => {
    let newHeader = { ...hd };
    let newFooter = { ...ft };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink: NavLinks) => navLink.label === entry.title,
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {},
          });
        }
        const fFound = newFooter?.navigation.link.find(
          (nlink: Links) => nlink.title === entry.title,
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return [newHeader, newFooter];
  };

  useEffect(() => {
    if (footer && header && entries) {
      const [newHeader, newFooter] = buildNavigation(entries, header, footer);
      setLayout({ header: newHeader, footer: newFooter });
    }
  }, [header, footer, entries]);

  return (
    <>
      {header ? <Header header={getLayout.header} entries={entries} /> : ''}
      <main className="mainClass mt-5">
        <>
          {children}
          {Object.keys(jsonObj).length && <DevTools response={jsonObj} />}
        </>
      </main>
      {footer ? <Footer footer={getLayout.footer} entries={entries} /> : ''}
    </>
  );
};

export default Layout;
