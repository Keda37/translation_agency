$(function () {

	// скролл у меню
	$('.js-scroll-el').click(function () {
		var scrollToElement = $(this).attr('href');
		$('html,body').animate({scrollTop:$(scrollToElement).offset().top+"px"},{duration:1E3});
	});

	// переход с кнопок 

	$('.js-button').click(function () {
		var scrollToElement = $(this).attr('data-href');
		$('html,body').animate({scrollTop:$(scrollToElement).offset().top+"px"},{duration:1E3});

		// если был переход с таблицы, то добавляем значение в скрытое поле для отправки формы
		if ($(this).attr('data-price')) {
			$('.js-value').val($(this).attr('data-price'));
		} else {
			$('.js-value').val('');
		}
	});

	// отправка форм
	$('form').submit(function(event) {
		event.preventDefault();

		var $form = $(this),
		$name = $form.find('.js-name-input').val(),
		$phone = $form.find('.js-phone-input').val(),
		$email = $form.find('.js-email-input').val(),
		$is_agreed = $form.find('.js-agreed-input').is(':checked') || 'not-info';
		$file = $form.find('.js-file-input').val() || 'not-info';
		$valueprice = $form.find('.js-value-input').val() || 'not-info';
		$.ajax({
			method: 'post',
			url: $form.attr('action'),
			data: {
				name: $name,
				phone: $phone,
				email: $email,
				price: $valueprice,
				file: $file,
				is_agreed: $is_agreed
			},

			success: function () {
				console.log($name, $phone, $email, $is_agreed, $file, $valueprice);
				$('.modal').addClass('active').hide().fadeIn(300);
			}
		});
	});

// закрытие формы
$('.modal-close').click(function() {
	$('.modal').fadeOut(300, function() {
		$('.modal').removeClass('active');
	});
});

$(document).mouseup(function (e){ // событие клика по веб-документу
    var div = $(".modal__wrapper"); // тут указываем элемента
        if (!div.is(e.target) && div.has(e.target).length === 0 && div.is(':visible')) { // и не по его дочерним элементам
        	$('.modal').fadeOut(300, function() {
        		$('.modal').removeClass('active');
        	});
        }
      });


// добавление имени файла при загрузке в форму
$('.js-file-input').on('change', function() {
    $('.js-file-label').text(this.files[0].name);
});


$('.js-reviews__logo-slider').slick({
  slidesToShow: 6,
  arrows: false,
  asNavFor: '.js-reviews__slider',
  focusOnSelect: true,
});
$('.js-reviews__slider').slick({
  infinite: true,
  slidesToShow: 1,
  arrows: true,
  asNavFor: '.js-reviews__logo-slider',
  fade: true,
  cssEase: 'linear'
});





});