// Get modal element
var startingWindow = document.getElementById('simpleModal');
// Function to open modal
function openModal(modal) {
  modal.style.display = 'block';
}

// Function to close modal
function closeModal(modal) {
  modal.style.display = 'none';
}
// First thing happens .. window onload.
window.onload = openModal(startingWindow);
// Character select functionality
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
} // end of Character select

var winModal = document.getElementById('win-modal');
const loseModal = document.getElementById('lose-modal');

