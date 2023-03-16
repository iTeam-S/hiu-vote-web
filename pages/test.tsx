import { useState, useEffect } from 'react';
const dataVar = [
  {
    title: "A",
    id: 1,
    content: 'AAAAAAAA'
  },
  {
    title: "B",
    id: 2,
    content: 'BBBBBBBB'
  },
  {
    title: "C",
    id: 3,
    content: 'CCCCCCCC'
  },
  {
    title: "D",
    id: 4,
    content: 'DDDDDDDD'
  },
  {
    title: "A",
    id: 5,
    content: 'AAAAAAAA'
  },
  {
    title: "B",
    id: 6,
    content: 'BBBBBBBB'
  },
  {
    title: "C",
    id: 7,
    content: 'CCCCCCCC'
  },
  {
    title: "D",
    id: 8,
    content: 'DDDDDDDD'
  },
  {
    title: "A",
    id: 9,
    content: 'AAAAAAAA'
  },
  {
    title: "B",
    id: 10,
    content: 'BBBBBBBB'
  },
  {
    title: "C",
    id: 11,
    content: 'CCCCCCCC'
  },
  {
    title: "D",
    id: 12,
    content: 'DDDDDDDD'
  }
];
function MyList() {
  const [data, setData] = useState(dataVar);
  const [isEndOfPage, setIsEndOfPage] = useState(false);

  function handleScroll() {
    const windowHeight =
      "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= documentHeight) {
      setIsEndOfPage(true);
    } else {
      setIsEndOfPage(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isEndOfPage) {
      // votre fonction à appeler lorsque l'utilisateur atteint la fin de la page
      console.log("ENDDDDDDDDDDDDD")
    }
  }, [isEndOfPage]);

  return (
    <div id="my-list" onScrollCapture={handleScroll} onScroll={handleScroll}>
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MyList;