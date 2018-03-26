function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isValid($item) {
	switch ($item.attr('type')) {
		case 'text':
		if ($item.attr('name') === 'email') {
			return !!$item.val() && validateEmail($item.val());
		}
		return !!$item.val() && !!$.trim($item.val());
		case 'checkbox':
		return !!$item.is(':checked');
		default:
		return false;
	}
}

function toggleClass($item, className, condition) {
	condition = typeof condition !== 'undefined' ? condition : true;
	switch ($item.attr('type')) {
		case 'checkbox':
		$item.parent().toggleClass(className, condition);
		break;
		default:
		$item.toggleClass(className, condition);
		break;
	}
}

function checkRequired($form, show_all_errors, $current_item) {
	show_all_errors = typeof show_all_errors !== 'undefined' ? show_all_errors : false;
	$current_item = typeof $current_item !== 'undefined' ? $current_item : $({});

	var $required = $form.find('.form-input.required');
	var result = true, error_class = 'has-error';
	$required.each(function (index, item) {
		var $item = $(item);
		var is_valid = isValid($item);
		if (show_all_errors || $current_item.is($item)) {
			toggleClass($item, error_class, !is_valid);
		}
		result = result && is_valid;
	});

	var $submit_button = $form.find('.submit-request-button');
	$submit_button.toggleClass('disabled', !result);
	$submit_button.prop('disabled', !result);

	return result;
}

$(function () {
	// Scroll down to anchor
	$('.form-button').click(function () {
		$('html,body').animate({scrollTop: $('#new').offset().top + "px"}, {duration: 1E3});
	});

	$('#requestForm').data('callback', function () {
		$('#requestForm').addClass('true');
	});

	$('form').on('submit', function (event) {
		event.preventDefault();

		var $form = $(this),
		$submit_button = $form.find('.submit-request-button'),
		isDisabled = $submit_button.hasClass('disabled');

		if (!isDisabled && checkRequired($form, true)) {
			$submit_button.addClass('disabled');
			$submit_button.prop('disabled', true);

			var name = $form.find('.name-input').val(),
			phone = $form.find('.phone-input').val(),
			email = $form.find('.email-input').val(),
			is_agreed = $form.find('#participateAgree').is(':checked')

			$.ajax({
				method: 'post',
				url: $form.attr('action'),
				data: {
					name: name,
					phone: phone,
					email: email,
					is_agreed: is_agreed
				},
				success: function () {

					$('.modal').addClass('active');
					setTimeout(function () {
						$('.modal').addClass('in');
					}, 100);
					$('.submit-request-button').val('Ваша заявка отправлена');
					
//					if (yaCounter34970585 && $form.data('goal')) {
//						yaCounter34970585.reachGoal($form.data('goal'));
//					}
$form.addClass('sent');
var callback = $form.data('callback');
if (callback) {
	callback();
}
}
})
		}
	});

	$('.form-text').on('input', function () {
		checkRequired($(this).closest('form'), false, $(this));
	});

	$('.form-checkbox').on('change', function () {
		checkRequired($(this).closest('form'), false, $(this));
	});
	$('.modal-close').click(function() {
		$('.modal').removeClass('in');
		setTimeout(function () {
			$('.modal').removeClass('active');
		}, 250);
	});
});