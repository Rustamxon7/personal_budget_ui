import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { addCategoryAction } from '../../redux/categories/categories';
import { fetchPersons } from '../../redux/people/person';
import { iconsList, fonds } from '../../lists/lists';
import { loadCurrentUser } from '../../redux/auth';

import './registrations.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('A title is required!'),
  icon: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Select one icon'),
  person_id: Yup.string().required('Select one person'),
});

const CreateCategory = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPersons());
    }, 1000);
  }, [dispatch]);

  const people = useSelector((state) => state.people.people) || [];
  const loading = useSelector((state) => state.people.loading);

  const currentUser = useSelector(loadCurrentUser);
  const currentPerson = people.find((person) => person.id === Number(location.pathname.split('/')[2])) || {};

  const validateCurrentPerson = () => {
    if (!currentPerson) {
      return location.pathname.split('/')[2];
    }
    return currentPerson.id;
  };

  const setForAllPersons = () => {
    const selectedPersons = people.map((person) => person.id);
    return selectedPersons;
  };

  return (
    <>
      <div className={`overlay ${open}`} onClick={() => setOpen('hidden')} onKeyDown={() => setOpen('hdden')} role="button" tabIndex="0" aria-label="overlay" />
      <div className={`popup ${open}`}>
        {!loading ? (
          <div className="popup__form">
            <div className="right-side">
              <div className="loader" />
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{
              title: '',
              icon: '',
              user_id: currentUser.data.id,
              color: '',
              money: '',
              person_id: validateCurrentPerson(),
              persons_array: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch(addCategoryAction(values));
              setSubmitting(false);
              window.location.reload();
              setTimeout(() => {
                // go back based on location
                if (location.pathname.includes('/categories/create')) {
                  navigate('/categories');
                } else {
                  navigate(`/people/${currentPerson.id}`);
                }
              }, 2000);
            }}
          >
            {({
              values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
            }) => (
              <div className="popup__form">
                <div className="right-side">
                  <form onSubmit={handleSubmit}>
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
                        {currentPerson &&
                          people.map((person) => (
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

                    <div className="fonds">
                      {fonds.map((fond) => (
                        <div key={fond.name} className="fond">
                          <input type="radio" name="money" id={fond.name} value={fond.name} onChange={handleChange} onBlur={handleBlur} checked={values.money === fond.name} />
                          <label htmlFor={fond.name} className="fond--label">
                            <span className="fond--name">{fond.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="form--group">
                      <button type="submit" className="btn" disabled={isSubmitting}>
                        Create
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
                            values.icon = icon.name;
                            handleChange(values);
                          }}
                        />
                        <label htmlFor={icon.name} className="icons--label" title={icon.name}>
                          <ion-icon name={`${icon.name}-outline`} style={{ color: icon.color }} />
                        </label>
                        <input type="hidden" name="color" id="color" onChange={handleChange} onBlur={handleBlur} value={values.color} />
                      </div>
                    ))}
                  </div>
                  {touched.icon && errors.icon && <div className="input-feedback">{errors.icon}</div>}
                </div>
              </div>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default CreateCategory;
