const handleHover = () => {
  const personOverlay = document.querySelector('.person--overlay');
  const personPopup = document.querySelector('.person--popup');

  if (personOverlay.classList.contains('hidden')) {
    personOverlay.classList.remove('hidden');
    personPopup.classList.remove('hidden');
  }
};

export default handleHover;
