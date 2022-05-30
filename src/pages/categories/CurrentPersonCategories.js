/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories/categories';

const CurrentPersonCategories = (currentPerson) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);
  const currentPersonsCategories = categories.filter((category) => {
    if (category.persons_array.includes(currentPerson.id)) {
      return category.persons_array.includes(currentPerson.id);
    }
    return category.person_id === currentPerson.id;
  });

  const currentPersonCategoriesList =
    currentPersonsCategories.length > 0 ? (
      currentPersonsCategories.map((category) => (
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
      <NavLink className="card" to={`/people/${currentPerson.id}/create-category`} key={currentPerson.id}>
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

  return <div className="categories--cards">{currentPersonCategoriesList}</div>;
};

export default CurrentPersonCategories;
