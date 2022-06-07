import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { addFundAction } from '../../redux/funds/funds';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('A title is required!'),
  amount: Yup.number().min(1, 'Too Low!').max(999999, 'Too High!').required('An amount is required!'),
  category_id: Yup.number().required('Select one category'),
  date: Yup.string().required('Select one date'),
  note: Yup.string().required('A note is required!').min(3, 'Too Short!').max(50, 'Too Long!'),
});

const AddFund = ({ open, setOpen, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className={`overlay ${open}`} onClick={() => setOpen('hidden')} onKeyDown={() => setOpen('hidden')} role="button" tabIndex="0" aria-label="overlay" />
      <div className={`popup ${open}`}>
        <Formik
          initialValues={{
            title: '',
            amount: '',
            category_id: category.id,
            type_declaration: category.money,
            icon: category.icon,
            type_operation: category.type_operation,
            date: '',
            note: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(addFundAction(values, values.category_id));
            setSubmitting(false);
            setTimeout(() => {
              // go back based on location
              if (location.pathname.split('/')[1] === 'categories') {
                navigate(`/categories/${location.pathname.split('/')[2]}`);
              } else {
                navigate(`/people/${location.pathname.split('/')[2]}`);
              }
              window.location.reload();
            }, 1000);
          }}
        >
          {({
            values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="popup__form popup__form--one">
              <label htmlFor="title">
                Category:
                {category.title}
              </label>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" onChange={handleChange} onBlur={handleBlur} value={values.title} className={`form-control ${errors.title && touched.title && 'is-invalid'}`} />
              {errors.title && touched.title && <div className="invalid-feedback">{errors.title}</div>}

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" id="amount" onChange={handleChange} onBlur={handleBlur} value={values.amount} className={`form-control ${errors.amount && touched.amount && 'is-invalid'}`} />
                {errors.amount && touched.amount && <div className="invalid-feedback">{errors.amount}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" onChange={handleChange} onBlur={handleBlur} value={values.date} className={`form-control ${errors.date && touched.date && 'is-invalid'}`} />
                {errors.date && touched.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="type_operation">Would you like to make it important?</label>
                <input type="checkbox" name="type_operation" id="type_operation" onChange={handleChange} onBlur={handleBlur} value={values.type_operation === 'important'} className={`form-control ${errors.type_operation && touched.type_operation && 'is-invalid'}`} />
              </div>

              <div className="form-group">
                <label htmlFor="note">Note</label>
                <textarea type="text" name="note" id="note" onChange={handleChange} onBlur={handleBlur} value={values.note} className={`form-control ${errors.note && touched.note && 'is-invalid'}`} />
                {errors.note && touched.note && <div className="invalid-feedback">{errors.note}</div>}
              </div>

              <button type="submit" className="btn" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddFund;
