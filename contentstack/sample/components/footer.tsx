import parse from 'html-react-parser';
import ImageNext from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import { onEntryChange } from '../core';
import { getFooterRes } from '../core/api';
import { FooterProps, Entry, Links } from '../types/layout';

const Footer = ({
  footer,
  entries,
}: {
  footer: FooterProps;
  entries: Entry;
}) => {
  const [getFooter, setFooter] = useState(footer);

  const buildNavigation = (ent: Entry, ft: FooterProps) => {
    let newFooter = { ...ft };
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach((entry) => {
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
    return newFooter;
  };

  const fetchData = useCallback(async () => {
    try {
      if (footer && entries) {
        const footerRes = await getFooterRes();
        const newfooter = buildNavigation(entries, footerRes);
        setFooter(newfooter);
      }
    } catch (error) {
      console.error(error);
    }
  }, [footer, entries]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [footer, fetchData]);

  const renderShare = (social: any) => (
    <a
      href={social.link.href}
      title={social.link.title}
      key={social.link.title}
    >
      {social.icon && (
        <ImageNext
          src={social.icon.url}
          alt={social.link.title}
          {...(social.icon.$?.url as {})}
          width={20}
          height={20}
        />
      )}
    </a>
  );

  const renderNavLink = (menu: any) => (
    <li className="footer-nav-li" key={menu.title} {...menu.$?.title}>
      <Link href={menu.href}>{menu.title}</Link>
    </li>
  );

  const footerData = getFooter ? getFooter : undefined;

  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          {footerData && footerData.logo ? (
            <Link href="/">
              <a className="logo-tag">
                <ImageNext
                  className="logo footer-logo"
                  src={footerData.logo.url}
                  alt={footerData.title}
                  title={footerData.title}
                  {...(footer.logo.$?.url as {})}
                  width={130}
                  height={30}
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {footerData ? (
                footerData.navigation.link.map(renderNavLink)
              ) : (
                <Skeleton width={300} />
              )}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {footerData ? (
              footerData.social?.social_share.map(renderShare)
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      {footerData && typeof footerData.copyright === 'string' ? (
        <div className="copyright" {...(footer.$?.copyright as {})}>
          {parse(footerData.copyright)}
        </div>
      ) : (
        <div className="copyright">
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
};

export default Footer;
