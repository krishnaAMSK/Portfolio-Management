const popup = document.querySelector('.popup');

function showPopup() {
  popup.style.display = 'block';
  setTimeout(hidePopup, 2000); 
}

function hidePopup() {
  popup.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', showPopup);