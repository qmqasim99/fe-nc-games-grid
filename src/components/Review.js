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
        <div className="review-wrapper">
          <ul>
            <li key={review.review_id}>
              <h2>{review.title}</h2>
              <p>
                <h3>Owner: </h3>
                {review.owner}
              </p>
              <p>
                <h3>Category: </h3>
                <Link to={`/reviews/category/${review.category}`}>
                  {review.category}
                </Link>
              </p>
              <img
                className="review-list-image"
                src={review.review_img_url}
                alt={review.title}
              />

              <p>
                <h3>Review: </h3>
              </p>
              <p>{review.review_body}</p>
              <p>
                <h3>Created at: </h3>
                {convertApiDate(review.created_at)}
              </p>
              <Votes
                votingPath={"reviews"}
                id={review.review_id}
                currentVotes={review.votes}
              />
              <p></p>
              <h3>Comment Count: {review.comment_count}</h3>
              <Comments review_id={review.review_id} />
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Review;
