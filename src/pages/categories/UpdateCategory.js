/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchCategory, updateCategoryAction } from '../../redux/categories/categories';
import { fetchPersons } from '../../redux/people/person';
import { loadCurrentUser } from '../../redux/auth';
import { iconsList } from './lists';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('A title is required!'),
  icon: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Select one icon'),
});

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchCategory(Number(location.pathname.split('/')[2])));
  }, [dispatch]);

  const people = useSelector((state) => state.people.people);
  const currentUser = useSelector(loadCurrentUser);
  const category = useSelector((state) => state.categories.category);

  const setForAllPersons = () => {
    const selectedPersons = people.map((person) => person.id);
    return selectedPersons;
  };

  return (
    <div className="contents">
      <Formik
        initialValues={{
          id: category.id,
          title: category.title,
          icon: category.icon,
          user_id: currentUser.data.id,
          money: category.money,
          person_id: category.person_id,
          persons_array: category.persons_array,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(updateCategoryAction(values));
          setSubmitting(false);
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        }}
        className="form"
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <div className="content--right">
              <div className="header">
                <h1 className="sessions--title">Personal Budget</h1>
              </div>
              <form onSubmit={handleSubmit} className="form">
                <h2 className="form--title">Add category</h2>
                <p className="sub--title">Add excyting category</p>

                <div className="form--group">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" onChange={handleChange} onBlur={handleBlur} value={values.title} className={touched.title && errors.title ? 'has-error' : null} />
                  {touched.title && errors.title && <div className="input-feedback">{errors.title}</div>}
                </div>

                <div className="form--group">
                  <label htmlFor="person_id">Person</label>
                  <select name="person_id" id="person_id" onChange={handleChange} onBlur={handleBlur} value={values.person_id} className={touched.person_id && errors.person_id ? 'has-error' : null}>
                    <option value="">Select one person</option>
                    {people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="persons_array">Select all people</label>
                  <input
                    {...(values.persons_array.length > 0
                      ? {
                        type: 'checkbox',
                        name: 'persons_array',
                        id: 'persons_array',
                        onChange: handleChange,
                        onBlur: handleBlur,
                        checked: true,
                      }
                      : {
                        type: 'checkbox',
                        name: 'persons_array',
                        id: 'persons_array',
                        onChange: handleChange,
                        onBlur: handleBlur,
                      })}
                    type="checkbox"
                    name="persons_array"
                    id="persons_array"
                    onClick={() => {
                      if (values.persons_array.length > 0) {
                        values.persons_array = [];
                      } else {
                        values.persons_array = setForAllPersons();
                      }
                    }}
                    className={touched.persons_array && errors.persons_array ? 'has-error' : null}
                  />
                </div>

                <div className="form--group">
                  <button type="submit" className="submit--btn" disabled={isSubmitting}>
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div className="content--left">
              <div className="iconsheader">
                <h1 className="icons--title">Select icon</h1>
              </div>

              <div className="icons">
                {iconsList.map((icon) => (
                  <div className="icons--item" key={icon.name}>
                    <input className="radio--button" type="radio" name="icon" id={icon.name} value={icon.name} onChange={handleChange} onBlur={handleBlur} checked={values.icon === icon.name} />
                    <label htmlFor={icon.name} className="icons--label" title={icon.name}>
                      <ion-icon name={`${icon.name}-outline`} style={{ color: icon.color }} />
                    </label>
                  </div>
                ))}
              </div>
              {touched.icon && errors.icon && <div className="input-feedback">{errors.icon}</div>}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UpdateCategory;
