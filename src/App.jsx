import { useState, useEffect } from "react";
import "./App.css";
import DisplayCard from "./components/DisplayCard";
import axios from "axios";
import FilterComp from "./components/filterComp";

function App() {
  //array of categories
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [Start, setStart] = useState(false);

  const requestCategories = () => {
    axios
      .get(
        // "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=HS7nw5eiQMLrwRGf39NThTu15HCkLFqM"
        "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=HS7nw5eiQMLrwRGf39NThTu15HCkLFqM"
      )
      .then((response) => {
        response.data.results.map((category) => {
          setCategories((categories) => [
            ...categories,
            category.list_name_encoded,
          ]);
        });
      });
  };
  //slide animation for intro and main
  const [main_position, setPosition] = useState({ left: 0, top: -100 });
  const [intro_position, setIntroposition] = useState({ left: 0, top: 5 });
  const [active, setActive] = useState(false);
  const handleStart = () => {
    requestCategories();
    setIntroposition({ left: 0, top: -100 });
    setTimeout(() => {
      setIntroposition({ left: 0, top: -100 });
    }, 10);

    setTimeout(() => {
      setActive(true);
    }, 20);

    setPosition({ left: 0, top: 0 });
    setTimeout(() => {
      setPosition({ left: 0, top: 0 });
    }, 10);
  };

  //request books from api based on category
  const [books, setBooks] = useState([]);
  const [currBook, setCurrBook] = useState([1]);
  const [title, setTitles] = useState();
  const [author, setAuthors] = useState();
  const [publisher, setPublishers] = useState();
  const [description, setDescriptions] = useState();
  // const [lastWeekrank, setLastWeekranks] = useState();
  const [currRank, setCurrRanks] = useState();
  const [imageURL, setImageURLs] = useState();
  const [bannedProperties, setBannedProperties] = useState([]);

  const requestBooks = (currentCategory) => {
    clearBooks();
    setCurrBook([1]);
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${currentCategory}.json?api-key=HS7nw5eiQMLrwRGf39NThTu15HCkLFqM`
      )
      .then((response) => {
        response.data.results.books.map((UnproccessedBooks) => {
          // console.log(UnproccessedBooks);
          setBooks((book) => [
            ...book,
            {
              id: UnproccessedBooks.rank,
              author: UnproccessedBooks.author,
              // lastWeekrank: UnproccessedBooks.rank_last_week,
              currRank: UnproccessedBooks.rank,
              publisher: UnproccessedBooks.publisher,
              title: UnproccessedBooks.title,
              description: UnproccessedBooks.description,
              imageURL: UnproccessedBooks.book_image,
            },
          ]);
        });
        // console.log(response.data.results);
      });

    // console.log("current category: " + currentCategory);
  };

  const updateCurrCategory = (e) => {
    var currentCategory = e.target.value;
    setCurrentCategory(currentCategory);
  };

  const clearBooks = () => {
    setBooks([]);
  };

  useEffect(() => {
    if (categories.length > 1) {
      setStart(true);
    }
  }, [categories]);

  useEffect(() => {
    if (Start) {
      // console.log("start "+ categories[0]);
      setCurrentCategory(categories[0]);
    }
  }, [Start]);

  useEffect(() => {
    if (currentCategory) {
      // console.log("current category: " + currentCategory);
      clearBooks();
      requestBooks(currentCategory);
    }
  }, [currentCategory]);

  const bannedAuthors = () => {
    const authors = bannedProperties
      .filter((property) => property.hasOwnProperty("author"))
      .map((property) => property.author);

    return authors.join(", ");
  };

  useEffect(() => {
    selectBook();
  }, [books]);

  const selectBook = () => {
    books.map((book) => {
      var bookId = book.id;
      // var validator = false;

      if (parseInt(bookId) == parseInt(currBook) && 
      !bannedProperties.includes(book.author) &&
      !bannedProperties.includes(book.publisher) &&
      !bannedProperties.includes(book.currRank.toString())) {
        setTitles(book.title);
        setAuthors(book.author);
        setPublishers(book.publisher);
        setDescriptions(book.description);
        // setLastWeekranks(book.lastWeekrank);
        setCurrRanks(book.currRank);
        setImageURLs(book.imageURL);
        // console.log("image Url " + book.imageURL);
      }
    });
  };


  const handleNext = () => {
    if (currBook < books.length) {
      setCurrBook(parseInt(currBook) + 1);
    }
  };

  const handleBack = () => {
    if (currBook > 1) {
      setCurrBook(parseInt(currBook) - 1);
    }
  };

  useEffect(() => {
    // console.log("currBook " + currBook);
    selectBook();
  }, [currBook]);

  const handleBan = (e) => {
    var ban = e.target.innerText;
 
    if (!bannedProperties.includes(ban) && ban != "Loading") {
      setBannedProperties((bannedProperties) => [...bannedProperties, ban]);
    }
  };

  const removeBan = (e) => {
    var ban = e.target.innerText;
    setBannedProperties(
      bannedProperties.filter((bannedProperty) => bannedProperty != ban)
    );
    //filter out the banned property from books

  };


  // console.log(bannedProperties);

  return (
    <div className="App">
      <div
        className="intro"
        style={{
          transform: `translate(${intro_position.left}vh, ${intro_position.top}vh)`,
        }}
      >
        <h1>A place to find your next book to read</h1>
        <h2>Browse New York Times Best Seller Books</h2>
        <button onClick={handleStart}>Start</button>
      </div>
      <div
        className={`main ${active ? "active" : ""}`}
        style={{
          transform: `translate(${main_position.left}vh, ${main_position.top}vh)`,
        }}
      >
        <div className="banner">
          <h1>NYT Best Seller Books</h1>
        </div>
        {/* //title, author, publisher, description, lastWeekrank, currRank ,url */}
        <DisplayCard
          title={title ? title : "Loading"}
          author={author ? author : "Loading"}
          publisher={publisher ? publisher : "Loading"}
          description={description ? description : "Loading"}
          // lastWeekrank={lastWeekrank ? lastWeekrank : "Loading"}
          currRank={currRank ? currRank : "Loading"}
          url={imageURL ? imageURL : "Loading"}
          handleBan={handleBan}
        />
        <div className="history-box">
          <FilterComp
            categories={categories}
            setCurrentCategory={updateCurrCategory}
            //  selectedCategory = {currentCategory}
          />
          <div className="saved">
            <button>Saved Books</button>
          </div>
        </div>
        <div className="ban-box">
          <h2>Banned </h2>
          <div className="bannedBtns">
            {bannedProperties.length > 0 &&
              bannedProperties.map((prop) => {
                return <button onClick={removeBan}>{prop}</button>;
              })}
          </div>
        </div>
        <div className="controlBtns">
          <button className="back" onClick={handleBack}>
            Back
          </button>
          <button className="next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
