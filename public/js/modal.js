
$(document).ready(function(){
    const today = moment();
    currentDate = today.format("L");

    console.log("    currentDate: ", currentDate)

    var years = moment().diff('1999-02-01', 'years');  // Just to test moment
    console.log("    years: ", years);
    console.log("");

    $("#submit1").on("click",function(){

        let over21 = localStorage.getItem("over21");  // Get the over21 value form localStorage
        let dateSelected = $("#dob").val();           // Get the inputed DOB from the modal input
        
        setTimeout(showWindow,2000);
        
        let userAge = 0;
        userAge = moment().diff(dateSelected, 'years');

        console.log("    Age of user: ", userAge);

        // Check the over21 value from localStorage
        if (over21 === "PARTY"){
            $('#modalID').modal("hide");
        }
        else if(over21 === "NO PARTY"){
            console.log("  You are under 21. Good bye!")


            window.open("/60seconddj");

            // console.log("  NEED CODE TO DIRECT TO 60Second DJ Page");   // Delete this code after 60second page is built 
            // localStorage.setItem("over21", "PARTY");                    // Setting over21 to PARTY as a workaround for now
            // $('#modalID').modal("hide");
            // $('html body').css('overflow','visible'); // Open scroll

            return
        }
        else if (userAge < 21){
            localStorage.setItem("over21", "NO PARTY");
            
            $('#modalID').modal("hide");
            $('html body').css('overflow','visible'); // Open scroll

            return

        }
        else if (userAge >= 21){
            console.log("    Your are 21 or Older. Welcome to the party!")
            localStorage.setItem("over21", "PARTY");


            $('#modalID').modal("hide");
            $('html body').css('overflow','visible'); // Open scroll
        }

        return
    });
 
    // Show the Age Modal on page load
    function showWindow(){
        let over21 = localStorage.getItem("over21")
        
        // Don't show the modal if the over21 localStorage value is set to PARTY
        if (over21 === "PARTY"){
            console.log("    over21 IN SHOWWINDOW", over21);
            return 
        }
        
        // Lock the modal in place and stop scrolling
        $('#modalID').modal({backdrop: 'static', keyboard: false});
        $('html body').css('overflow','hidden');
    };

   // call fuction after some time (2s)
   setTimeout(showWindow,2000);


});




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


