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
          <svg
            className="background--custom"
            id="demo"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#32645d"
              fill-opacity="0.2"
              d="M-100 -100L200 -100L200 70L-100 70Z"
              style={path0style}
            />
            <path
              fill="#0C3236"
              fill-opacity="0.3"
              d="M-100 -100L200 -100L200 30L-100 30Z"
              style={path1style}
            />
            <path
              fill="#4cb5a1"
              fill-opacity="0.7"
              d="M-100 -100L200 -100L200 90L-100 90Z"
              style={path2style}
            />
          </svg>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
