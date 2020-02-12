$(document).ready(function(){

	var checkRegisterForm = (function(){

		var _registerForm = $('#register-form');
		var inputs = _registerForm.find('input');
		var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var emailValue = '';
		var passwordValue = '';


		//универсальная функция, которая будет находить все ошибки и прятать их
		var _hideErrors = function() {
			$('.notify').hide();
		}


		//универсальная функция для показа уведомлений/нотификаций
		var _showError = function(title, desc) {
			
			if(desc) {
				var $errorHtml = $('<div class="notify no-paddings">');
				var $errorHtmlTitle = $('<div class="notify no-radius-bottom notify--error">');
				$errorHtmlTitle.text(title);

				var $errorHtmlDesc = $('<div class="notify no-radius-top">');
				$errorHtmlDesc.html(desc);

				$($errorHtmlTitle).appendTo($errorHtml);
				$($errorHtmlDesc).appendTo($errorHtml);

			} else {
				//создаем элемент, который потом добавим на страницу
				var $errorHtml = $('<div class="notify notify--error mb-20">');
				$errorHtml.text(title);
			}

			$errorHtml.appendTo('#errorsWrapper');

		}
		
		
		// Метод инициализации
		var init = function(){
			_setUpListeners();
		}


		// Метод прослушки событий
		var _setUpListeners = function(){
			_registerForm.on('submit', function(event){
				_hideErrors();
				// _showError('Test message');
				_registerFormValidate(event);
			});
		}
		//Приватный метод
		var _registerFormValidate = function(event){
			event.preventDefault();

			$.each(inputs, function(index, val){
				var input = $(val),
				value = input.val().trim();

				//Проверка на корректность Email
				if (input.attr('type').toLowerCase() === 'email') {
					if (value == '') {
						_showError('Email не должен быть пустым');
					} else {
						if (patternEmail.test(value)) {
							emailValue = value;
						} else {
							_showError('Введите корректный Email');
						}
					}
				//Проверка на корректность пароля
				} else if (input.attr('type').toLowerCase() === 'password') {
					if (value == '') {
						_showError('Пароль не должен быть пустым');
					} else {
						passwordValue = value;
					}

				}
				console.log(emailValue);
			});
			console.log(emailValue);
			

			if (emailValue !== 'mail@mail.com' && passwordValue !== '') {
				_registerForm.unbind('submit').submit();
			} else if ((emailValue.length > 0 && passwordValue.length > 0) && (emailValue = 'mail@mail.com')) {
				event.preventDefault();
				_showError('Этот email уже занят', '<p>Используйте другой email чтобы создать новый аккаунт.</p><p> Или воспользуйтесь <a href="#!">восстановлением пароля </a>, чтобы войти на сайт.</p>');
			} else {
				event.preventDefault();
			}	
		}

		return { init, _showError }
	}());

	checkRegisterForm.init();

});