// Get modal element
var modal = document.getElementById('simpleModal');
window.onload = openModal();
// Get open modal button
// var modalBtn = document.getElementById('modalBtn'); //deleteMe:
document.querySelectorAll('.character');

// Function to open modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to close modal if outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}