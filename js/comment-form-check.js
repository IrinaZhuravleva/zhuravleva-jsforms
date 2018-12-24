$(document).ready(function(){

 	var checkCommentForm = (function(){

 		var _form = $('#comment-add-form');
 		var _commentTextarea = $('#commentText');
 		var _commentErrorEmpty = $('#commentErrorEmpty');
 		
 		// Метод инициализации
 		var init = function(){
 			_setUpListeners();
 		}

 		// Метод прослушки событий
 		var _setUpListeners = function(){
 			_form.on('submit', function(event){
 				_formValidate(event);
 			});
 		}

 		//Приватные методы
 		var _formValidate = function(event){
 			event.preventDefault();

 			if (_commentTextarea.val() == ''){
 				_commentErrorEmpty.fadeIn();
 			} else {
 				_commentErrorEmpty.fadeOut();
 				$('form').unbind('submit').submit();
 			}
 			// console.log(_commentTextarea.val());
 		}

 		return {
 			init
 		}

 	}());

 	checkCommentForm.init();
 	
 });