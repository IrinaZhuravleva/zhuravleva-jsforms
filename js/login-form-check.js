$(document).ready(function(){

	var checkLoginForm = (function(){

		var _loginForm = $('#login-form');
		var inputs = _loginForm.find('input');
		var noEmail = _loginForm.find('#no-email');
		var noPassword = _loginForm.find('#no-password');
		var incorrectEmail = _loginForm.find('#incorrect-email');
		var incorrectLogin = _loginForm.find('#incorrect-login');
		
		
		// Метод инициализации
		var init = function(){
			_setUpListeners();
		}

		// Метод прослушки событий
		var _setUpListeners = function(){
			_loginForm.on('submit', function(event){
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
						incorrectEmail.addClass('error-hide');
						noEmail.removeClass('error-hide');
					} else if (value !== '') {
					
						var pattern = /mail@mail.com/;
							if (pattern.test(value)) {
								noEmail.addClass('error-hide');
								incorrectEmail.addClass('error-hide');
							} else {
								noEmail.addClass('error-hide');
								incorrectEmail.removeClass('error-hide');
						}
					}
				} else if (input.attr('type').toLowerCase() === 'password') {
					if (value == '') {
						incorrectLogin.addClass('error-hide');
						noPassword.removeClass('error-hide');
					} else if (value !== '') {
					
					  var pattern = /123/;
							if (pattern.test(value)) {
							noPassword.addClass('error-hide');
							incorrectPassword.addClass('error-hide');
							} else {
							incorrectEmail.addClass('error-hide');
							noPassword.addClass('error-hide');
							incorrectLogin.removeClass('error-hide');          
						}
					}
				}
			});
		}

		return {
			init
		}
	}());

	checkLoginForm.init()
});

