import Document, { Head, Html, Main, NextScript } from 'next/document'
import { maintainStatus } from './index'

// ===========================================================

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div
            className={
              maintainStatus
                ? 'background--custom--maintainON'
                : 'background--custom--maintainOFF'
            }
          >
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}
