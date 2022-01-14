import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { convertApiDate, getApiDate } from "../utils/dates";
import Comments from "./Comments";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import Votes from "./Votes";

const Review = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReview(review_id)
      .then((data) => {
        setIsLoading(false);
        console.log("data ", data);
        setReview(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [review_id]);

  console.log("review ", review);
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
          <ul>
            <li key={review.review_id}>
              <p>Title: {review.title}</p>
              <p>Owner: {review.owner}</p>
              <p>
                Category:{" "}
                <Link to={`/reviews/category/${review.category}`}>
                  {review.category}
                </Link>
              </p>
              <img
                className="review-list-image"
                src={review.review_img_url}
                alt={review.title}
              />

              <p>Review: </p>
              <p>{review.review_body}</p>
              <p>Created at: {convertApiDate(review.created_at)}</p>
              <Votes
                votingPath={"reviews"}
                id={review.review_id}
                currentVotes={review.votes}
              />
              <p>Comment Count: {review.comment_count}</p>
              <Comments review_id={review.review_id} />
            </li>
          </ul>
        </>
      )}
    </main>
  );
};

export default Review;
