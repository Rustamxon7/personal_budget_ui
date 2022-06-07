import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../../redux/categories/categories';

import CreateCategory from './CreateCategory';

const Categories = ({ type }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState('hidden');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const loading = useSelector((state) => state.categories.loading);

  const handleCategoryType = (type) => {
    // incomes, expenses or all
    if (type === 'incomes' && categories.length > 0) {
      return categories.filter((category) => category.money === 'incomes') || [];
    }
    if (type === 'expenses' && categories.length > 0) {
      return categories.filter((category) => category.money === 'expenses') || [];
    }
    return categories && categories.length > 0 ? categories : [];
  };

  const handleClick = () => {
    setOpen('');
    let loading = false;
    if (loading) {
      return;
    }
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1000);
  };

  const createComponent = (open, setOpen) => {
    if (open === '') {
      return <CreateCategory open={open} setOpen={setOpen} />;
    }
    return null;
  };

  const categoriesList =
    handleCategoryType(type).length > 0 ? (
      handleCategoryType(type).map((category) => (
        <NavLink className="category category--shopping" to={`/categories/${category.id}`} key={category.id}>
          <ion-icon name={`${category.icon}-outline`} style={{ color: category.color }} />
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
        <button type="button" className="btn" onClick={handleClick}>
          Add
        </button>
      </div>
      <div className="categories">{categoriesList}</div>
      {createComponent(open, setOpen)}
    </div>
  );
};

export default Categories;
