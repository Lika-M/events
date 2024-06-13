import Head from 'next/head';

export default function HeadContent({ title, content }) {

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={content}></meta>
        </Head>
    );
}