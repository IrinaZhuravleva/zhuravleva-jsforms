$(document).ready(function(){

	var checkRegisterForm = (function(){

		var _registerForm = $('#register-form');
		var inputs = _registerForm.find('input');
		var noEmail = _registerForm.find('#no-email');
		var noPassword = _registerForm.find('#no-password');
		var incorrectEmail = _registerForm.find('#incorrect-email');
		var occupiedLogin = _registerForm.find('#occupied-login');
		var button = _registerForm.find('.button--enter');
		var emailValue;
		var passwordValue;


		var showNoEmail = function() {
			incorrectEmail.addClass('error-hide');
			noEmail.removeClass('error-hide');
		}
		var noShowEmail = function() {
			noEmail.addClass('error-hide');
			incorrectEmail.addClass('error-hide');
		}
		var showIncorrectEmail = function() {
			noEmail.addClass('error-hide');
			incorrectEmail.removeClass('error-hide');
		}
		var showNoPassword = function() {
			occupiedLogin.addClass('error-hide');
			noPassword.removeClass('error-hide');
		}
		var noShowPassword = function() {
			noPassword.addClass('error-hide');
			occupiedLogin.addClass('error-hide');
		}
		var showOccupiedLogin = function() {
			incorrectEmail.addClass('error-hide');
			noPassword.addClass('error-hide');
			occupiedLogin.removeClass('error-hide');
		}
	
		
		// Метод инициализации
		var init = function(){
			_setUpListeners();
		}
		// debugger
		// Метод прослушки событий
		var _setUpListeners = function(){
			_registerForm.on('submit', function(event){
				_registerFormValidate(event);
			});
		}
		//Приватный метод
		var _registerFormValidate = function(event){
			event.preventDefault();

			$.each(inputs, function(index, val){
				var input = $(val),
				value = input.val().trim();
				if (input.attr('type').toLowerCase() === 'email') {
					if (value == '') {
						showNoEmail();
					} else if (value !== '') {
						var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
						if (pattern.test(value)) {
							noShowEmail();
							emailValue = value;
						} else {
							showIncorrectEmail();
						}
					}
				} else if (input.attr('type').toLowerCase() === 'password') {
					if (value == '') {
						showNoPassword();
					} else if (value !== '') {
						var pattern = /123/;
						if (pattern.test(value)) {
							noShowPassword();
							passwordValue = value;
						} else {
							showOccupiedLogin();
						}
					}
				}

			});

			if (emailValue !== 'mail@mail.com' && passwordValue === '123') {
				_registerForm.unbind('submit').submit();

			}  else if ((emailValue.length > 0 && passwordValue.length > 0) && (emailValue = 'mail@mail.com')) {
				event.preventDefault();
				occupiedLogin.removeClass('error-hide');
			} else {
				event.preventDefault();
			}	
		}

		return {
			init
		}
	}());

	checkRegisterForm.init();

});