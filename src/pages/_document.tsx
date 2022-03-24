import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`

            #__next {
              height: 100%;
            }
          `}</style>
          <Html />
        </body>
      </html>
    );
  }
}