/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchCategory, updateCategoryAction } from '../../redux/categories/categories';
import { fetchPersons } from '../../redux/people/person';
import { iconsList } from '../../lists/lists';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('A title is required!'),
  icon: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Select one icon'),
});

const UpdateCategory = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentLocation = location.pathname.split('/')[1];

  const validateCurrentPerson = () => {
    if (currentLocation === 'people') {
      return parseInt(location.pathname.split('/')[4], 10);
    }
    return parseInt(location.pathname.split('/')[2], 10);
  };

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchCategory(validateCurrentPerson()));
  }, [dispatch]);

  const people = useSelector((state) => state.people.people);
  const category = useSelector((state) => state.categories.category);

  const setForAllPersons = () => {
    const selectedPersons = people.map((person) => person.id);
    return selectedPersons;
  };

  return (
    <>
      <div className={`overlay ${open}`} onClick={() => setOpen('disabled')} onKeyDown={() => setOpen('disabled')} role="button" tabIndex="0" />
      <div className={`popup ${open}`}>
        <Formik
          initialValues={{
            id: category.id,
            title: category.title,
            icon: category.icon,
            person_id: category.person_id,
            persons_array: category.persons_array,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(updateCategoryAction(values));
            setSubmitting(false);
            setTimeout(() => {
              // go back
              window.history.back();
              window.location.reload();
            }, 1000);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <div className="popup__form">
              <div className="right-side">
                <form onSubmit={handleSubmit}>
                  <h2 className="form--title">Update category</h2>
                  <p className="sub--title">Update excyting category</p>

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
                    {touched.person_id && errors.person_id && <div className="input-feedback">{errors.person_id}</div>}
                  </div>

                  <div className="select--all">
                    <label htmlFor="persons_array">Select all people</label>
                    <input
                      type="checkbox"
                      name="persons_array"
                      id="persons_array"
                      onClick={() => {
                        values.persons_array = setForAllPersons();
                        handleChange(values);
                      }}
                    />
                  </div>

                  <br />
                  <br />
                  <br />

                  <div className="form--group">
                    <button type="submit" className="btn" disabled={isSubmitting}>
                      Update
                    </button>
                  </div>
                </form>
              </div>
              <div className="left-side">
                <div className="icons">
                  {iconsList.map((icon) => (
                    <div className="icons--item" key={icon.name}>
                      <input
                        className="radio--button"
                        type="radio"
                        name="icon"
                        id={icon.name}
                        value={icon.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.icon === icon.name}
                        onClick={() => {
                          values.color = icon.color;
                          handleChange(values);
                        }}
                      />
                      <label htmlFor={icon.name} className="icons--label" title={icon.name}>
                        <ion-icon name={`${icon.name}-outline`} style={{ color: icon.color }} />
                      </label>
                      {/* set values.color === icon.color */}
                      <input type="hidden" name="color" id="color" onChange={handleChange} onBlur={handleBlur} value={values.color} />
                    </div>
                  ))}
                </div>
                {touched.icon && errors.icon && <div className="input-feedback">{errors.icon}</div>}
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdateCategory;
