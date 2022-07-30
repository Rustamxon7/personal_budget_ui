export const handleHover = () => {
  const personOverlay = document.querySelector('.person--overlay');
  const personPopup = document.querySelector('.person--popup');

  if (personOverlay.classList.contains('hidden')) {
    personOverlay.classList.remove('hidden');
    personPopup.classList.remove('hidden');
  }
};

export const closePopup = () => {
  const overlay = document.querySelector('.person--overlay');
  overlay.classList.add('hidden');
  const popup = document.querySelector('.person--popup');
  popup.classList.add('hidden');
};
