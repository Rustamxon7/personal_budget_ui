/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories/categories';

const Categories = (person) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const navigationLink = (person) => {
    if (person.id) {
      const currentPersonLink = `/people/${person.id}/create-category`;
      return currentPersonLink;
    }
    return '/create-category';
  };

  const categoriesList =
    categories.length > 0 ? (
      categories.map((category) => (
        <NavLink className="card" to={`/categories/${category.id}`} key={category.id}>
          <ion-icon name={`${category.icon}-outline`} />
          <div className="card--info">
            <h3>{category.title}</h3>
            <p>
              <span>$</span>
              <span>0</span>
            </p>
          </div>
        </NavLink>
      ))
    ) : (
      <NavLink className="card" to={navigationLink(person)} key={person.id}>
        <ion-icon name="add-circle-outline" />
        <div className="card--info">
          <h3>Add Category</h3>
          <p>
            <span>$</span>
            <span>0</span>
          </p>
        </div>
      </NavLink>
    );

  return <div className="categories--cards">{categoriesList}</div>;
};

export default Categories;
