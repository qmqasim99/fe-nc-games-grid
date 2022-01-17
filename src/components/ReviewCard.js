import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <Link to={`/reviews/${review.review_id}`}>
        <li key={review.review_id}>
          <img
            className="review-list-image"
            src={review.review_img_url}
            alt={review.title}
          />
          <p>
            {" "}
            <h3>Title:</h3> {review.title}
          </p>
          <p>
            <h3>Owner:</h3> {review.owner}
          </p>
          <p>
            <h3>No. of comments: </h3>
            {review.comment_count}
          </p>
        </li>
      </Link>
    </div>
  );
};

export default ReviewCard;
