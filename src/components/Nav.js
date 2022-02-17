import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import RequireLogin from './RequireLogin';

const Nav = ({ category, setCategory }) => {
  const navigate = useNavigate;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <nav>
      <ul className="nav-menu-wrapper">
        <li className="categoryLinks">
          <Link to="/reviews">All reviews</Link>
        </li>

        {categories.map((cat) => {
          return (
            <li className="categoryLinks" key={cat.slug} value={cat.slug}>
              <Link key={cat.slug} to={`/reviews/category/${cat.slug}`}>
                {cat.slug}
              </Link>
            </li>
          );
        })}
        <RequireLogin />
      </ul>
    </nav>
  );
};

export default Nav;
