import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import CreateCategory from './CreateCategory';
import Loader from '../../components/Loader';
import { fetchCategories } from '../../redux/categories/categories';

const CurrentPersonCategories = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPerson = parseInt(location.pathname.split('/')[2], 10);

  const [open, setOpen] = useState('hidden');

  const categories = useSelector((state) => state.categories.categories) || [];
  const loading = useSelector((state) => state.categories.loading) || false;

  const currentPersonsCategories = categories.filter((category) => {
    if (category.persons_array.includes(currentPerson)) {
      return category.persons_array.includes(currentPerson);
    }
    return category.person_id === currentPerson;
  });

  const handleCategoryType = (type) => {
    switch (type) {
      case 'incomes':
        return currentPersonsCategories.filter((category) => category.money === 'incomes') || [];
      case 'expenses':
        return currentPersonsCategories.filter((category) => category.money === 'expenses') || [];
      default:
        return currentPersonsCategories && currentPersonsCategories.length ? currentPersonsCategories : [];
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const currentPersonCategoriesList = currentPersonsCategories.length ? (
    handleCategoryType(type).map((category) => (
      <NavLink className="category category--shopping" to={`/people/${currentPerson}/categories/${category.id}`} key={category.id}>
        <ion-icon name={`${category.icon}-outline`} />
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
    <Loader />
  ) : (
    <div>
      <div className="heading-tertiary">
        <h3>Categories</h3>
        <button type="button" className="btn" onClick={() => setOpen('')}>
          Add
        </button>
      </div>
      <div className="categories">{currentPersonCategoriesList}</div>
      <CreateCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default CurrentPersonCategories;
