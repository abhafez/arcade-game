// Get modal element
var modal = document.getElementById('simpleModal');
window.onload = openModal();
// Get open modal button
// var modalBtn = document.getElementById('modalBtn'); //deleteMe:
var character = document.querySelectorAll('.character');

character.forEach(char => {
    char.addEventListener('click', select, false);
});

function select(target) {
    character.forEach(char => {
        char.childNodes[1].classList = 'character';
    });
    target.target.classList = 'character selected';
    startCharacter = 'images/' + target.target.id + '.png';
    document.querySelector('.btn').style.display = 'inline';
}

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