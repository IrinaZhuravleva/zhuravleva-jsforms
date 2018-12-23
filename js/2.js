$(document).ready(function() {
  (function(){
    var formValidation = {

      isValid: true,

      init: function(){
        //вызов внутренних функций
        this._setUpListeners();

      },

      _setUpListeners: function(){
        $('#form').on( 'submit', formValidation._validateForm).on('submit', formValidation._sendEmail);
        $('#clear').on('click', formValidation._clearForm);

      },

      _validateForm: function(event){
        event.preventDefault();
        console.log('_private method _validateForm - runs');
        var form = $(this),
          inputs = form.find('input, textarea'),
          checkboxes = form.find('input:checkbox'),
          radios = form.find('input:radio'),
          valid = true;

          //Loop through each input field
        $.each(inputs, function(index, val){
          var input = $(val),
            value = input.val().trim(),
            formGroup = input.parents('.form__group'),
            label = formGroup.find('label').text().toLowerCase(),
            textError = 'Вы не ввели ' + label,
            tooltip = $('<span class="form__tooltip ">' + textError + '</span>');

            
          if( value.length === 0) {
            // Show errors
            formGroup.addClass('error');
            formGroup.find('.form__tooltip').remove();
            tooltip.appendTo(formGroup);
            valid = false;
          } else {
            formGroup.removeClass('error');
            formGroup.find('.form__tooltip').remove();
          }

          //Check if input type is email, not a textarea and is valid email
          if ( !(input.is('textarea')) ) {
           if (input.attr('type').toLowerCase() === 'email') {
            if (value !== '') {
              var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
              if (pattern.test(value)) {
                formGroup.removeClass('error');
                formGroup.find('.form__tooltip').remove();
                console.log('Email is VALID');
              } else {
	                formGroup.addClass('error');
	                formGroup.find('.form__tooltip').remove();
	                textError = 'Введите верный email адрес';
	                tooltip = $('<span class="form__tooltip ">' + textError + '</span>');
	                tooltip.appendTo(formGroup);
	                valid = false;
	                console.log('Email is INVALID');
	              }
	            }
          	}
          }
          

            // Hide errors
            input.on('focus', function(){
              formGroup.find('.form__tooltip').remove();
            });

            input.on('keydown', function(){
              formGroup.removeClass('error');
            });

            input.on('change', function(){
              formGroup.removeClass('error');
            });

        });
        	//Loop through each checkbox 
        $.each(checkboxes, function(index, val){
        	var checkbox = $(val),
        	formGroup = checkbox.parents('.form__group'),
        	tooltip = $('<span class="form__tooltip ">Нужно выбрать этот чекбокс</span>');

	        if ( checkbox.attr('data-fvalid') == 'required' ) {
	        	if ( checkbox.is(':checked') ) {
	        		formGroup.find('.form__tooltip').remove();
	        	} else {
	        		formGroup.addClass('error');
	        		formGroup.find('.form__tooltip').remove();
	        		tooltip.appendTo(formGroup);
	        		valid = false;

	        	}
	        }

	        checkbox.on('click', function(){
	        	formGroup.find('.form__tooltip').remove();
	        	formGroup.removeClass('error');
	        })

        });

        //Loop through each radio 
        $.each(radios, function(index, val) {
        	var radio = $(val),
	            value = radio.val(),
	            type = radio.attr("type"),
	            name = radio.attr("name"),
	            requiredValue = radio.attr("data-fvalid"),
	            formGroup = radio.parents('.form__group'),
	            tooltip = $('<span class="form__tooltip ">Нужно сделать выбор</span>');

	            if ( requiredValue == 'required')  {
	            	if ( $( 'input[name="' +  name + '"]:checked').length == 0 ) {
	            		formGroup.addClass('error');
		        		formGroup.find('.form__tooltip').remove();
		        		tooltip.appendTo(formGroup);
		        		valid = false;
	            	}
	            }

	            radio.on('click', function(){
	        	formGroup.find('.form__tooltip').remove();
	        	formGroup.removeClass('error');
	        });

         });


        formValidation.isValid = valid;

      },

     	_sendEmail: function(){
      		console.log('formValidation.isValid = ' + formValidation.isValid);
		        if ( formValidation.isValid === true ) {
		          console.log('Sending form!');
		        } else {
		          console.log('Validation FAILED!');
		        }
		},

		//еще один метод
		_clearForm: function(event){
			event.preventDefault();
			var thisForm = $(this).parents('form');

			thisForm.find('.form__tooltip').remove();
			thisForm.find('.form__group').removeClass('error');
			thisForm[0].reset();
		}



    };



    formValidation.init();

  }());
  

});