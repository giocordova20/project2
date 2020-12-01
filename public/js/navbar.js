$(document).ready(function() {
    $(window).scroll(function() {
      if($(this).scrollTop() < $("#green").height()){
         $(".navbar").removeClass("bg-light");
      }
      else{
         $(".navbar").addClass("bg-light");
      }
    });
  });