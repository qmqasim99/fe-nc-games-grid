import { useEffect, useState, useContext } from "react";
import { deleteComment, getReviewComments, postComments } from "../utils/api";
import CommentCard from "./CommentCard";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/UserContext";

const Comments = ({ review_id }) => {
  const { user } = useContext(UserContext);
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
  };

  const handleOnSubmit = (username, newComment) => {
    console.log(
      "Review ID: ",
      review_id,
      "Username: ",
      username,
      "new comment value: ",
      newComment
    );
    let allComments = [];
    postComments(review_id, user.username, newComment)
      .then((data) => {
        console.log("returned posted comment data", data);
        setErrorMessage("");

        allComments = [data, ...comments];
        console.log("All COmments", allComments);
        setComments(allComments);

        // setComments((currState) => {
        //   console.log("currstate is ", currState);
        //   console.log("data.comment is ", data);
        //   const  tempObj = [...currState, data];

        //   console.log("temp Obj ", tempObj);
        //   return tempObj;
        // });
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.message);
      });
    console.log("aall commnets outside: ", allComments);
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
          <PostComment handleOnSubmit={handleOnSubmit} />
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
