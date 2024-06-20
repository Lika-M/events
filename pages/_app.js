import Head from 'next/head';
import Layout from '../components/layout/layout.js'
import '../styles/globals.css'
import Notification from '../components/notification/notification.js';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <Notification title='Test' message= 'This is test' status = 'error'/>
    </Layout>
  );
}

export default MyApp;
