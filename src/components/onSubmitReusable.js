const onSubmitReusable = ({ setSubmitting }) => {
  setSubmitting(true);
  setSubmitting(false);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export default onSubmitReusable;
