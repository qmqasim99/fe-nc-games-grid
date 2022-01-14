import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import ReviewCard from "./ReviewCard";

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
        console.log("in Reviews List res:", data);
        setReviews(data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [category_id]);
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
