import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://qm-nc-games-example.herokuapp.com/api",
});

//  get a list of categories
export const getCategories = () => {
  return ncGamesApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

// get a list of reviews
export const getReviews = (category) => {
  let apiPath = "/reviews";

  if (category) {
    apiPath += `?category=${category}`;
  }
  return ncGamesApi.get(apiPath).then((res) => {
    return res.data.reviews;
  });
};

export const getReview = (review_id) => {
  return ncGamesApi.get("/reviews/" + review_id).then((res) => {
    return res.data.review;
  });
};

export const getReviewComments = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

// this function can update votes for reviews / comments
export const patchVotes = (votingPath, id, inc_votes) => {
  const apiPath = `/${votingPath}/${id}`;
  console.log("apiPath", apiPath);

  return ncGamesApi
    .patch(apiPath, { inc_votes })

    .then((res) => {
      console.log("In patchVotes ", res.data);
      return res.data;
    });
};

// get user details
export const getUser = (username) => {
  return ncGamesApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const check = (comment_id) => {
  console.log("check id", comment_id);
};

// delete a comment
export const deleteComment = (comment_id) => {
  console.log("delete  comment", comment_id);
  return ncGamesApi.delete(`/comments/${comment_id}`);
};

// this function can post comments for a review
export const postComments = (review_id, username, comment) => {
  const apiPath = `/reviews/${review_id}/comments`;
  console.log("apiPath", apiPath);

  return ncGamesApi
    .post(apiPath, { username, body: comment })

    .then((res) => {
      return res.data.comment;
    });
};
