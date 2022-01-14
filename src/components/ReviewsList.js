import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getSortedReviews } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import ReviewCard from "./ReviewCard";
import SortReviewsMenu from "./SortReviewsMenu";

const ReviewsList = () => {
  const { category_id } = useParams();

  console.log("catching ay params; ", category_id);

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReviews(category_id)
      .then((data) => {
        setIsLoading(false);
        console.log("in Reviews List res:", data);
        setReviews(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [category_id]);

  const handleSortSubmit = (sort, sortOrder) => {
    console.log("in handleSortSubmit: ", sort);

    getSortedReviews(category_id, sort, sortOrder)
      .then((data) => {
        setIsLoading(false);
        console.log("in SORTED Reviews List:", data);
        setReviews(data);
      })
      .catch((error) => {
        console.log("in error:", error.response.data.msgr);
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  };

  return (
    <main>
      {isError ? (
        <>
          <ErrorMessage msg={errorMessage} />
        </>
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          {category_id ? (
            <h1>Reviews for category: {category_id}</h1>
          ) : (
            <h1>Reviews for all categories:</h1>
          )}
          <SortReviewsMenu handleSortSubmit={handleSortSubmit} />
          <ul>
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </ul>
        </>
      )}
    </main>
  );
};

export default ReviewsList;
