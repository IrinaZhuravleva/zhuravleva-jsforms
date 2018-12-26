$(document).ready(function(){

	var checkLoginForm = (function(){

		var _loginForm = $('#login-form');
		var inputs = _loginForm.find('input');
		var noEmail = _loginForm.find('#no-email');
		var noPassword = _loginForm.find('#no-password');
		var incorrectEmail = _loginForm.find('#incorrect-email');
		var incorrectPassword = _loginForm.find('#incorrect-password');
		var button = _loginForm.find('.button--enter');
		var emailValue = '';
		var passwordValue = '';


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
			incorrectPassword.addClass('error-hide');
			noPassword.removeClass('error-hide');
		}
		var noShowPassword = function() {
			noPassword.addClass('error-hide');
			incorrectPassword.addClass('error-hide');
		}
		var showIncorrectPassword = function() {
			incorrectEmail.addClass('error-hide');
			noPassword.addClass('error-hide');
			incorrectPassword.removeClass('error-hide');
		}
	
		
		// Метод инициализации
		var init = function(){
			_setUpListeners();
		}

		// // Метод прослушки событий
		var _setUpListeners = function(){
			_loginForm.on('submit', function(event){
				_loginFormValidate(event);
			});
		}

		//Приватный метод
		var _loginFormValidate = function(event){
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
							console.log(emailValue);
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
							console.log(passwordValue);
						} else {
							showIncorrectPassword();
						}
					}
				}
			});

		if (emailValue === 'mail@mail.com' && passwordValue === '123') {
			}  else if ((emailValue.length > 0 && passwordValue.length > 0) && (emailValue != 'mail@mail.com' || passwordValue != '123')) {
				event.preventDefault();
				incorrectPassword.removeClass('error-hide');
			} else {
				event.preventDefault();
			}
			
		}

		return {
			init
		}
	}());

	checkLoginForm.init();

});

