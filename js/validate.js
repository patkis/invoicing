jQuery(function() {
    
  jQuery.validator.addMethod("textRegex", function(value, element) {
    return this.optional(element) || /[-\.a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]/.test(value);
  }, "Nesprávny formát!");

  jQuery.validator.addMethod('integer_not_null', function(value, element, param) {
    return (value != 0) && (value == parseInt(value, 10));
  }, 'Povinný údaj!');

  jQuery.validator.addMethod('currency', function(value, element) {
    return this.optional(element) || /^((\$\d*)|(\$\d*\.\d{2})|(\d*)|(\d*\.\d{1,2}))$/.test(value);
  }, "Nesprávny formát!");


});


jQuery.extend(jQuery.validator.messages, {
  required: "Povinný údaj!",
  email: "Nesprávny email!",
  date: "Nesprávny dátum!",
  number: "Musí byt číslo!",
  digits: "Please enter only digits.",
  equalTo: "Please enter the same value again.",
  maxlength: jQuery.validator.format("Maximálna dlžka je {0}!"),
  minlength: jQuery.validator.format("Minimálna dlžka je {0}!"),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});


function validate_client_form() {
  form = jQuery("#client_form")
  form.validate({
  rules: {
    company: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    fname: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    lname: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      required: true,
      email: true,
      minlength: 3,
      maxlength: 50,
    },
    street: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    city: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    zip: {
      required: true,
      number: true,
      minlength: 3,
      maxlength: 10,
    },
    country: {
      required: true,
      textRegex: true,
      minlength: 2,
      maxlength: 50,
    },
    ico: {
      required: true,
      number: true,
      minlength: 8,
    },
    dic: {
      required: true,
      number: true,
      minlength: 10,
    },
    icdph: {
      required: true,
      textRegex: true,
      minlength: 12,
    },

  },

  });
    
  if (form.valid()) {
    return true;
  } else {
    return false;
  }
}


function validate_invoice_form() {
  form = jQuery("#invoice_form")
  form.validate({
  rules: {
    var_sym: {
      required: true,
      number: true,
      minlength: 8,
      maxlength: 10,
    },
    client: {
      required: true,
      integer_not_null: true,
    },
    created: {
      required: true,
      date: true,
    },
    expired: {
      required: true,
    },
  },

  });
    
  if (form.valid()) {
    return true;
  } else {
    return false;
  }
}


function validate_invoice_item_form() {
  form = jQuery("#invoice_item_form")
  form.validate({
  rules: {
    item_descr: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    quantity: {
      required: true,
      number: true,
    },
    price: {
      required: true,
      currency: true,
    },
  },

  });
    
  if (form.valid()) {
    return true;
  } else {
    return false;
  }
}


function validate_account_form() {
  form = jQuery("#account_form")
  form.validate({
  rules: {
    company: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    fname: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    lname: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      required: true,
      email: true,
      minlength: 3,
      maxlength: 50,
    },
    street: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    city: {
      required: true,
      textRegex: true,
      minlength: 3,
      maxlength: 50,
    },
    zip: {
      required: true,
      number: true,
      minlength: 3,
      maxlength: 10,
    },
    country: {
      required: true,
      textRegex: true,
      minlength: 2,
      maxlength: 50,
    },
    ico: {
      required: true,
      number: true,
      minlength: 8,
    },
    dic: {
      required: true,
      number: true,
      minlength: 10,
    },
    icdph: {
      required: true,
      textRegex: true,
      minlength: 12,
    },

  },

  });
    
  if (form.valid()) {
    return true;
  } else {
    return false;
  }
}
