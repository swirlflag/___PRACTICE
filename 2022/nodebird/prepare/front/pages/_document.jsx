import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
// document, app에서만 쓰는 특수한 서버사이드 props
    static async getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;
        try {
            context.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props}/>)
            })
            const initialProps = await Document.getInitialProps(context);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        }catch(err) {
            console.error(err);
        }finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main>11..</Main>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022"/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}