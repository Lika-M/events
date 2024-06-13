import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="us">
                <Head />
                <body>
                    <div id="overlay" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}