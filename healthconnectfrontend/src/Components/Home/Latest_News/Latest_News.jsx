import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Latest_News = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsToShow, setNewsToShow] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        // "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=38e2f4abaa454e8994c62788e73b185c"
        "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=e45e76a0de0d408aabcae2ee84ca4de8"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const fetchedData = await response.json();
      setData(fetchedData.articles);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Filter out articles with a non-null urlToImage
      const filteredNews = data.filter(
        (article) => article.urlToImage !== null
      );
      setNewsToShow(filteredNews);
    }
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirst = currentIndex === 0;

    const newIndex = isFirst ? newsToShow.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const NextSlide = () => {
    const isLast = currentIndex === newsToShow.length - 1;

    const newIndex = isLast ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  return (
    <div className="py-10 px-4 relative group bg-blue-200 select-none">
      <div className="w-[90%] h-[80%] bg-white m-auto flex p-10 rounded-3xl">
        {newsToShow.length > 0 &&
          console.log(newsToShow[currentIndex].urlToImage)}
        {newsToShow.length > 0 && newsToShow[currentIndex].urlToImage && (
          <img
            src={newsToShow[currentIndex].urlToImage}
            alt="description"
            className="w-[20rem] h-[15rem] rounded-2xl"
          />
        )}

        {newsToShow.length > 0 && (
          <div className="ml-[2rem]">
            <div className="text-3xl font-bold underline text-cyan-700 mb-5">{newsToShow[currentIndex].title}</div>
            <div className="text-lg">{newsToShow[currentIndex].description}</div>
          </div>
        )}
      </div>
      <div
          onClick={prevSlide}
          className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactLeft size={30} />
        </div>
        <div
          onClick={NextSlide}
          className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        >
          <BsChevronCompactRight size={30} />
        </div>
    </div>
  );
};

export default Latest_News;
