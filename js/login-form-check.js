$(document).ready(function(){

	var checkLoginForm = (function(){

		var _loginForm = $('#login-form');
		var inputs = _loginForm.find('input');
		var noEmail = _loginForm.find('#no-email');
		var noPassword = _loginForm.find('#no-password');
		var incorrectEmail = _loginForm.find('#incorrect-email');
		var incorrectPassword = _loginForm.find('#incorrect-password');
		var emailIsValid = false;
		var passwordIsValid = false;
		var button = _loginForm.find('.button--enter');
		var incorrectLogin = _loginForm.find('#incorrect-login');


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

		// Метод прослушки событий
		var _setUpListeners = function(){
			button.on('click', function(event){
				_loginFormValidate(event);
			});
		}
		//Приватные методы
		var _loginFormValidate = function(event){
			event.preventDefault();

			$.each(inputs, function(index, val){
				var input = $(val),
				value = input.val();
				if (input.attr('type').toLowerCase() === 'email') {
					if (value == '') {
						showNoEmail();
					} else if (value !== '') {
						var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
						if (pattern.test(value)) {
							noShowEmail();
							emailIsValid = true;
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
							passwordIsValid = true;
						} else {
							showIncorrectPassword();
						}
					}
				}


			});

			// var _formValidation = function(event){
 		// 		event.preventDefault();
 				if (emailIsValid == true && passwordIsValid == true) {
 					

					_loginForm.submit()
				} else {
					incorrectLogin.removeClass('error-hide');
				}
			// }
		}

		return {
			init
		}
	}());

	checkLoginForm.init();

});

