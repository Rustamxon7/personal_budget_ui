/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories/categories';
import CreateCategory from './CreateCategory';

const Categories = ({ type }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState('hidden');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const handleCategoryType = (type) => {
    // incomes, expenses or all
    if (type === 'incomes') {
      return categories.filter((category) => category.money === 'incomes');
    }
    if (type === 'expenses') {
      return categories.filter((category) => category.money === 'expenses');
    }
    return categories;
  };

  const categoriesList =
    categories.length > 0 ? (
      handleCategoryType(type).map((category) => (
        <NavLink className="category category--shopping" to={`/categories/${category.id}`} key={category.id}>
          <ion-icon name={`${category.icon}-outline`} style={{ color: category.color }} />
          <span className="category__name">{category.title}</span>
          <span className="category__price">100$</span>
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

  return (
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
