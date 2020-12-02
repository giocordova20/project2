$(document).ready(function(){



    function showWindow(){
        $('#modalID').show();
        // stop scroll
        $('html body').css('overflow','hidden');
    }
    //showWindow()

    function hideWindow(){
        $('#modelID').hide();
        // on scroll
        $('html body').css('overflow','scroll');
    }
    //hideWindow();


   // call fuction after some time (2s)
   setTimeout(showWindow,2000);


   $('#close-btn').click(function(){
       hideWindow();
   })




})




/*

// function to hide modal until button is push
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


