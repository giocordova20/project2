
const toggleModal = () => {
    document.querySelector('modal').classList.toggle('modal--hidden');


}



const toggleModalTimer = () => {
    document.querySelector('.mTimer').classList.toggle('mTimer--hidden');
    var modalTime = 1;
    function setTime() {
        var timerInterval = setInterval(function() {
            modalTime--;
        
            if(timeleft === 0) {
              clearInterval(timerInterval);
              toggleModal();
            }
        
          }, 1000);
    }



};

//timer
var timeleft = 100;
function setTime() {
    var timerInterval = setInterval(function() {
      timeleft--;
      timer.textContent = timeleft + " seconds left till end of the Test.";
  
      if(timeleft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
}

// when timer ends
function sendMessage() {
    if(timer.textContent = " "){
        var h1 = document.createElement("h1");
  
        h1.textContent = "GAME OVER"
        timer.appendChild(h1); 
        gameover();
    }
  
}

const time = 0.9;
function modalPopup(){
    ageMessage.textContent = ageMessage
};







/*// function to hide modal until button is push
const toggleModal = () => {
    document.querySelector('.modal').classList.toggle('modal--hidden');
};

// modal pop up when you click the button
document.querySelector('#show-modal').addEventListener('click', toggleModal);

// hide modal when click submit
document.querySelector('#dob').addEventListener('submit',(event) =>{
    event.preventDefault();
    toggleModal();
});  

// hide modal when click X
document.querySelector('.modal__close-bar span')
.addEventListener('click', toggleModal);
*/


