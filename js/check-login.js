// $(document).ready(function() {

// 	console.log('Hello world!');	

// });

$(document).ready(function() {

	var checkLogin = (function () {

		var _loginForm = $('#login-form');
		var _login = $('#login');
		var _password = $('#password');
		var _errorEmptyLogin = $('#error__empty-login');
		var _errorEmptyPassword = $('#error__empty-password');
		var _errorWrongPassword = $('#error__wrong-login');
		var _errorLoginPassword = $('#error__login-password');


		var init = function () {
			_setUpListners();
		}

		var _setUpListners = function () {
			_loginForm.on('submit', function (e) {
				_checkLogin(e);
				_checkPassword(e);
				_submitForm(e);
			})
		}

		var _checkLogin = function (e) {
			e.preventDefault();
			var value = _login.val().trim();
			if (value == '') {
				_errorEmptyLogin.removeClass('hidden');
			} else {
				_errorEmptyLogin.addClass('hidden');
			}

			if (value != '') {
				var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
				if (pattern.test( value )) {
					_errorWrongPassword.addClass('hidden');
				} else {
					_errorWrongPassword.removeClass('hidden');
					_errorEmptyLogin.addClass('hidden');
				}
			}
		}

		var _checkPassword = function (e) {
			e.preventDefault();
			if (_password.val().trim() == '') {
				_errorEmptyPassword.removeClass('hidden');
			} else {
				_errorEmptyPassword.addClass('hidden');
			}
		}

		var _submitForm = function (e) {
			e.preventDefault(e);
			var valueLogin = _login.val().trim();
			var valuePassword = _password.val().trim();

			if (valueLogin == 'mail@mail.com' && valuePassword == '123') {
				$('#login-form').unbind('submit').submit();
			} else if (valueLogin != '' && valuePassword != '') {
				_errorLoginPassword.removeClass();
			}
		}


		return {
			init
		}
	}());

	checkLogin.init();

});