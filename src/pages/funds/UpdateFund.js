/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Formik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { updateFundFromAllPersons } from '../../redux/funds/funds';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('A title is required!'),
  amount: Yup.number().min(1, 'Too Low!').max(999999, 'Too High!').required('An amount is required!'),
  // date: Yup.string().required('Select one date'),
  // note: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
});

const UpdateFund = ({ open, setOpen, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className={`overlay ${open}`} onClick={() => setOpen('hidden')} onKeyDown={() => setOpen('hdden')} role="button" tabIndex="0" />
      <div className={`popup person--popup ${open}`}>
        <Formik
          initialValues={{
            id: category.id,
            title: category.title,
            amount: category.amount,
            date: category.date,
            note: category.note,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(updateFundFromAllPersons(values, category.category_id, category.id));
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
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="popup__form popup__form--one" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" id="amount" placeholder="Amount" onChange={handleChange} onBlur={handleBlur} value={values.amount} />
                {errors.amount && touched.amount && <div className="input-feedback">{errors.amount}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="type_operation">Would you change it?</label>
                <input type="checkbox" name="type_operation" id="type_operation" onChange={handleChange} onBlur={handleBlur} value={values.type_operation === 'important'} className={`form-control ${errors.type_operation && touched.type_operation && 'is-invalid'}`} />
              </div>
              <div className="form-group">
                <label htmlFor="note">Note</label>
                <textarea type="text" name="note" id="note" placeholder="Note" onChange={handleChange} onBlur={handleBlur} value={values.note} />
                {errors.note && touched.note && <div className="input-feedback">{errors.note}</div>}
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

UpdateFund.defaultProps = {
  open: 'hidden',
  setOpen: () => {},
  category: {},
};

export default UpdateFund;
