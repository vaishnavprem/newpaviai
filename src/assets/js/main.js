$( document ).ready(function() {
  // if($('.go-all-jobs').length) {
  //   $(".go-all-jobs").click(function() {
  //     console.log(545454);
  //     $('.more-jobs-close').css('display', 'none');
  //     $('.more-jobs-open').css('display', 'flex');
  //     $('.back-all-jobs').css('display', 'block');
  //     $(this).css('display', 'none');
  //   });
  // }
  // if($('.back-all-jobs').length) {
  //   $( ".back-all-jobs" ).click(function() {
  //     $('.more-jobs-close').css('display', 'flex');
  //     $('.more-jobs-open').css('display', 'none');
  //     $('.more-jobs-open').css('display', 'block');
  //     $(this).css('display', 'none');
  //   });
  // }
  if($('.owl-carousel').length) {
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
        0:{
          items:1
        },
        480:{
          items:2
        },
        1000:{
          items:2
        }
      }
    })
  }
  if($('.profile-edit-profile-btn').length) {
    $( ".profile-edit-profile-btn" ).click(function() {
      $('.profile-save-btn').toggleClass('profile-save-btn-open');
      $(this).toggleClass('profile-edit-profile-btn-close');
      $('.section-block-10-form form').toggleClass('profile-item-input-border');
      $('.profile-btns').toggleClass('profile-btns-close');
    });
    $( ".profile-save-btn" ).click(function() {
      $('.profile-edit-profile-btn').toggleClass('profile-edit-profile-btn-close');
      $(this).toggleClass('profile-save-btn-open');
      $('.section-block-10-form form').toggleClass('profile-item-input-border');
      $('.profile-btns').toggleClass('profile-btns-close');
      $('.old-new-email').css('display', 'none');
      $('.changes-passwords').css('display', 'none');
      $('.form-elements').css('display', 'flex');
    });
  }
  if($('.profile-edit-btn').length) {
    $( ".profile-edit-btn" ).click(function() {
      $('.profile-delete-btn').toggleClass('profile-delete-btn-open');
      $('.profile-save-2-btn').toggleClass('profile-save-2-btn-open');
      $(this).toggleClass('profile-edit-btn-close');
    });
    $( ".profile-save-2-btn" ).click(function() {
      $('.profile-delete-btn').toggleClass('profile-delete-btn-open');
      $('.profile-edit-btn').toggleClass('profile-edit-btn-close');
      $(this).toggleClass('profile-save-2-btn-open');
    });
  }
  if($('.change-email-btn').length) {
    $( ".change-email-btn" ).click(function() {
      $('.profile-btns').toggleClass('profile-btns-close');
      $('.old-new-email').css('display','flex');
      $('.form-elements').css('display', 'none');
      $('.profile-edit-profile-btn').toggleClass('profile-edit-profile-btn-close');
      $('.profile-save-btn').toggleClass('profile-save-btn-open');
    });
  }
  if($('.change-email-btn-2').length) {
    $( ".change-email-btn-2" ).click(function() {
      $('.profile-btns').toggleClass('profile-btns-close');
      $('.changes-passwords').css('display','flex');
      $('.form-elements').css('display', 'none');
      $('.profile-edit-profile-btn').toggleClass('profile-edit-profile-btn-close');
      $('.profile-save-btn').toggleClass('profile-save-btn-open');
    });
  }
  if($('.slider-round-right-1').length) {
    $( ".slider-round-right-1" ).click(function() {
      $('.find-job-block-info-1').css('display','none');
      $('.find-job-block-info-2').css('display','flex');
      $('.slider-round-1').css('display','none');
      $('.slider-round-2').css('display','flex');
    });
  }
  if($('.slider-round-right-2').length) {
    $( ".slider-round-right-2" ).click(function() {
      $('.find-job-block-info-1').css('display','flex');
      $('.find-job-block-info-2').css('display','none');
      $('.slider-round-1').css('display','flex');
      $('.slider-round-2').css('display','none');
    });
  }
  if($('.glider').length) {
    new Glider(document.querySelector(".glider"), {
      slidesToShow: 1.5,
      slidesToScroll: 1,
      draggable: true,
      dots: ".dots",
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            duration: 0.5,
            arrows: {
              prev: ".glider-prev",
              next: ".glider-next"
            }
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
            duration: 0.5,
            arrows: {
              prev: ".glider-prev",
              next: ".glider-next"
            }
          }
        }
      ]
    });
  }


});
