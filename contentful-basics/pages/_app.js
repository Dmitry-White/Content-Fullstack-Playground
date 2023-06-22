import MainLayout from '../layouts/MainLayout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default MyApp;
