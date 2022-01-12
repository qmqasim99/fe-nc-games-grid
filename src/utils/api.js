import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://qm-nc-games-example.herokuapp.com/api",
});

export const getReviews = (category) => {
  let apiPath = "/reviews";

  if (category !== "all") {
    apiPath += `?category=${category}`;
  }

  console.log(apiPath);
  return ncGamesApi.get(apiPath).then((res) => {
    console.log("in UTILS reviews", res.data.reviews);
    return res.data.reviews;
  });
};

//  get a list of categories
export const getCategories = () => {
  return ncGamesApi.get("/categories").then((res) => {
    console.log("in UTILS Categories", res.data.categories);
    return res.data.categories;
  });
};

export const getReviewsByCategories = () => {
  return ncGamesApi.get("/reviews").then((res) => {
    console.log("in UTILS Categories", res.data.categories);
    return res.data.categories;
  });
};
