$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.png"></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {                
                dots: true,
                arrows: false,
              }
            },
            {
              breakpoint: 767,
              settings: {
                dots: true,
                arrows: false,
              }
            },
            {
              breakpoint: 575,
              settings: {
                dots: true,
                arrows: false,
              }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.holder').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link_back');
    

    // Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
      })
  });
    
    // jQuery Validate plugin

    function valideForm(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите не менее {0} символов!")
          },
          phone: "Пожалуйста, введите номер телефона",
          email: {
            required: "Пожалуйста, введите свой E-mail",
            email: "Неправильно введен E-mail!"
          }
        }
      });
    };
    
    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    //jQuery Masked input

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    // Submit script

    $('form').submit(function(e) {
      e.preventDefault();
      let $form = $(this);
      if(! $form.valid()) return false;
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href='#up']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    $("a[href='#product']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    //wow 

    new WOW().init();

});

