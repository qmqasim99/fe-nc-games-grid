import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getSortedReviews } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import ReviewCard from "./ReviewCard";
import SortReviewsMenu from "./SortReviewsMenu";

const ReviewsList = () => {
  const { category_id } = useParams();

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
        setReviews(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [category_id]);

  const handleSortSubmit = (sort, sortOrder) => {
    getSortedReviews(category_id, sort, sortOrder)
      .then((data) => {
        setIsLoading(false);
        setReviews(data);
      })
      .catch((error) => {
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
            <h2>Reviews for category: {category_id}</h2>
          ) : (
            <h2>Reviews for all categories:</h2>
          )}
          <SortReviewsMenu handleSortSubmit={handleSortSubmit} />
          <ul className="review-card-wrapper ">
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
