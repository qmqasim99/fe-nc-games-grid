import { useEffect, useState } from "react";
import { check, deleteComment, getReviewComments } from "../utils/api";
import CommentCard from "./CommentCard";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReviewComments(review_id)
      .then((data) => {
        setIsLoading(false);
        console.log("in Comments List res:", data);
        setComments(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [review_id]);

  const handleDeleteComment = (e) => {
    const id = parseInt(e.target.value);
    console.log("delete button invoked", id);
    setComments(comments.filter((comment) => comment.comment_id !== id));

    deleteComment(id).catch((error) => {
      setIsError(true);
      setErrorMessage(error.response.data.msg);
    });

    //check(id);
  };

  return (
    <section className="review-card">
      {isError ? (
        <>
          <ErrorMessage msg={errorMessage} />
        </>
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  deleteComment={handleDeleteComment}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default Comments;
