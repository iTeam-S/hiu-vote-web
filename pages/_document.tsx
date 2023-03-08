import Document, { Head, Html, Main, NextScript } from 'next/document'

const path0style = {
  animation: 'path0 20s linear infinite alternate',
}

const path1style = {
  animation: 'path1 25s linear infinite alternate',
}

const path2style = {
  animation: 'path2 17.241379310344826s linear infinite alternate',
}

class MyDocument extends Document {
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
          <div className="background--custom">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
