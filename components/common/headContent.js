import Head from 'next/head';

export default function HeadContent({title, content}){

    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={content}></meta>
        </Head>
    );
}