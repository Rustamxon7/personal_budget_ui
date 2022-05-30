import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, removeCategoryAction } from '../../redux/categories/categories';

const Category = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategory(location.pathname.split('/')[2]));
  }, [dispatch]);

  const handleRemove = () => {
    dispatch(removeCategoryAction(location.pathname.split('/')[2]));
    window.history.back();
    window.location.reload();
  };

  const category = useSelector((state) => state.categories.category);

  return (
    <div className="container">
      <div className="main">
        <div className="main--title">
          <h2>Monthly Budget</h2>
          <NavLink to={`/categories/${category.id}/edit`}>
            <ion-icon name="add-outline" />
          </NavLink>
        </div>

        <button type="button" className="remove-category" onClick={handleRemove}>
          <ion-icon name="trash-outline" />
        </button>

        {/* Incomes/Expences */}

        <div className="card">{category.title}</div>

        <div className="main--chart" />
      </div>
    </div>
  );
};

export default Category;
