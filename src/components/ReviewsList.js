import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../utils/api";

const ReviewsList = ({ category, setCategory }) => {
  const { category_id } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (category_id) setCategory(category_id);
    getReviews(category).then((data) => {
      console.log("in Reviews List res:", data);
      setReviews(data);
    });
  }, [category]);
  return (
    <main>
      <h1>Reviews for cat: {category}</h1>
      <ul>
        {reviews.map((review) => {
          return <li>{review.title}</li>;
        })}
      </ul>
    </main>
  );
};

export default ReviewsList;
