import Head from 'next/head';
import Link from 'next/link';

const Header = () => (
  <div className="p-2 bg-blau text-white">
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

const Footer = () => (
  <div className="mt-4 p-2 bg-blau text-white">
    <a
      href="https://www.contentstack.com/academy"
      target="_blank"
      rel="noreferrer"
    >
      Contentstack Academy
    </a>
  </div>
);

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Exam Shop</title>
      </Head>

      <Header />

      <main>
        <div className="h-screenx py-20 px-60"> {props.children}</div>
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
