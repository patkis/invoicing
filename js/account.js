jQuery(document).ready(function(){


  jQuery('#nav-account').addClass('active');

  get_account_data();


  // fill input fields with account data
  function get_account_data() {
  	jQuery.ajax({
      url: base_url+"account/get_account_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',                        
      type: 'post',
      success: function(data) {
      	data = JSON.parse(data);
      	client_data = data[0];
      	for (i in client_data) {
          jQuery('input#'+i).val(client_data[i]);
      	}
      }
    });
  }


  jQuery(document).on("click", "#save_account", function(){
    if (validate_account_form()) {
      var data = {};
      
      jQuery('input').each(function() {
        data[this.id] = jQuery(this).val();
      });
      var form_data = new FormData();                
      form_data.append('client_data', JSON.stringify(data));
      update_account_data(data);
    }
  })


  function update_account_data(data) {
    var form_data = new FormData();                
    form_data.append('account_data', JSON.stringify(data));

    jQuery.ajax({
      url: base_url+"account/update_account_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',  
      data: form_data,               
      type: 'post',
      success: function(data) {
        jQuery.alert({
          title: 'Update!',
          content: 'Zmenené.',
        });
        get_account_data();
      }
    });
  }
      

});