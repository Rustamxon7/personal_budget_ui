import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../../redux/categories/categories';

import CreateCategory from './CreateCategory';
import { iconsList } from '../../lists/lists';

const Categories = ({ type }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState('hidden');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const loading = useSelector((state) => state.categories.loading);

  const handleCategoryType = (type) => {
    switch (type) {
      case 'incomes':
        return categories.filter((category) => category.money === 'incomes') || [];
      case 'expenses':
        return categories.filter((category) => category.money === 'expenses') || [];
      default:
        return categories && categories.length ? categories : [];
    }
  };

  const categoriesList = handleCategoryType(type).length ? (
    handleCategoryType(type).map((category) => (
      <NavLink className="category category--shopping" to={`/categories/${category.id}`} key={category.id}>
        <ion-icon name={`${category.icon}-outline`} style={{ color: iconsList.find((icon) => icon.name === category.icon).color }} />
        <span className="category__name">{category.title}</span>
        <span className="category__price">
          $
          {category.sum_funds}
        </span>
      </NavLink>
    ))
  ) : (
    <>
      <div className="category category--shopping" onClick={() => setOpen('')} onKeyDown={() => setOpen('')} role="button" tabIndex={0}>
        <ion-icon name="add-circle-outline" />
        <span className="category__name">Add category</span>
      </div>
    </>
  );

  return !loading ? (
    <div className="app category-page loader--container">
      <img className="loader" src="img/loader.svg" alt="Loading" />
    </div>
  ) : (
    <div>
      <div className="heading-tertiary">
        <h3>Categories</h3>
        <button type="button" className="btn" onClick={() => setOpen('')}>
          Add
        </button>
      </div>
      <div className="categories">{categoriesList}</div>
      <CreateCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default Categories;
