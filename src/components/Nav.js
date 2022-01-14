import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import RequireLogin from "./RequireLogin";

const Nav = ({ category, setCategory }) => {
  const navigate = useNavigate;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      console.log("in Categories List res:", data);
      setCategories(data);
    });
  }, []);

  return (
    <nav>
      <ul>
        <Link to="/reviews">
          <li>All reviews</li>
        </Link>
        {categories.map((cat) => {
          return (
            <Link key={cat.slug} to={`/reviews/category/${cat.slug}`}>
              <li key={cat.slug} value={cat.slug}>
                {cat.slug}
              </li>
            </Link>
          );
        })}
      </ul>
      <RequireLogin />
    </nav>
  );
};

export default Nav;
