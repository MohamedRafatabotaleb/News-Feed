import { Container, Button, Typography } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import NewsHeader from "./componentes/NewsHeader";
import NewsFeed from "./componentes/NewsFeed";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),

  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 4;

function App() {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [category, setCategory] = useState("general");

  const pageNumber = useRef(1);

  const queryValue = useRef("");

  async function loadData(currentCategory) {
    /*  const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}& q=${
        queryValue.current
      }&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    ); */

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}& q=${queryValue.current}&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=defa10f23e6547589a7acf46643df63b`
    );

    const MRCC =
      "https://newsapi.org/v2/top-headlines?category=general& q=&page=1&pageSize=4&country=us&apiKey=defa10f23e6547589a7acf46643df63b";

    const data = await response.json();

    if (data.status === "error") {
      throw new Error("An errorr has ocurred");
    }

    return (data.articles || []).map((article) => {
      const { author, title, description, urlToImage, publishedAt, url } =
        article;
      return {
        url,
        author,
        title,
        description,
        image: urlToImage,
        publishedAt,
      };
    });
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
        setLoading(false);
      })
      .catch((errorMessage) => setError(errorMessage.message))
      .finally(() => setLoading(false));
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticles, 500);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };

  const handlePreviousClick = () => {
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(newCategory.target.value);
  };

  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
