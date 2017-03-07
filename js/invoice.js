jQuery(document).ready(function(){

  function init() {
    get_invoice_list();
    fill_client_dropdown();

    // datepicker translation
    jQuery.datepicker.regional['sk'] = {
      monthNames: ['Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Oktober','November','December'],
      dayNamesMin: ['Ne','Po','Ut','St','Št','Pi','So'],
      dateFormat: 'yy-mm-dd'
    };

    // set datepiscer language and initialize datepicker
    jQuery.datepicker.setDefaults(jQuery.datepicker.regional['sk']);
    jQuery('#created, #expired').datepicker();

    // default theme for select2
    jQuery.fn.select2.defaults.set( "theme", "bootstrap" );
    
    // set active for invoice tab
    jQuery('#nav-invoice').addClass('active'); 
  }


  jQuery('th.no-click').removeClass('sorting');
    




  init();


  // table row highlight
  jQuery('#invoice_list').on('click', '.table-row', function(event) {
    if(jQuery(this).hasClass('active')){
      jQuery(this).removeClass('active'); 
    } else {
      jQuery(this).addClass('active').siblings().removeClass('active');
    }
  });


  // show modal for adding invoice
  jQuery(document).on("click", "#invoice_add", function() {
  	jQuery('<button type="button" id="save" class="btn btn-primary">Uložiť</button>').appendTo('#modal_invoice_add #button_area');
  	jQuery('#modal_invoice_add').modal('show');		  
  });


  // add invoice
  jQuery(document).on("click", "#modal_invoice_add #save", function(){
    if (validate_invoice_form()) {
      var invoice_data = {};
      jQuery('#modal_invoice_add #invoice_form input:not(#invoice_id)').each(function() {
		    invoice_data[this.id] = jQuery(this).val();
      });
      jQuery('#modal_invoice_add select').each(function() {
        invoice_data[this.id] = jQuery(this).val();
      });

      var invoice_item_data = {};
      i = 0;
      jQuery('#modal_invoice_add #invoice_item_table tbody tr.item_new').each(function(){
        invoice_item_data[i] = {};
        jQuery('td:not(:last-child)', this).each(function(){
          invoice_item_data[i][jQuery(this).attr('item')] = jQuery(this).text();
        });
        i++;
      });
      
      var form_data = new FormData();                
      form_data.append('invoice_data', JSON.stringify(invoice_data));
      form_data.append('invoice_item_data', JSON.stringify(invoice_item_data));
      console.log(invoice_data);
      add_invoice_data(form_data);
    }
  })

  
  // fill modal with selected invoice data
  jQuery(document).on("click", "button#invoice_edit", function(){
  	var form_data = new FormData(); 
    var id = jQuery('#invoice_list tr.active').attr('id');
    if (!id) {
      jQuery.alert({
        title: 'Chyba!',
        content: 'Nemáte vybrané žiadne data.',
      });
    } else {
  	  jQuery('#modal_invoice_add #invoice_id').val(id);               
      form_data.append('invoice_id', id);
      get_invoice_data(form_data);
      jQuery('<button type="button" id="update" class="btn btn-primary">Uložiť</button>').appendTo('#modal_invoice_add #button_area');
      jQuery('#modal_invoice_add .modal-header h3').text('Upraviť faktúru');
      jQuery('#modal_invoice_add').modal('show');
    }
  })


  // edit invoice
  jQuery(document).on("click", "#modal_invoice_add #update", function(){
    if (validate_invoice_form()) {
      var invoice_id = jQuery('#modal_invoice_add #invoice_id').val();
      var invoice_data = {};
      jQuery('#modal_invoice_add #invoice_form input:not(#invoice_id)').each(function() {
        invoice_data[this.id] = jQuery(this).val();
      });
      jQuery('#modal_invoice_add select').each(function() {
        invoice_data[this.id] = jQuery(this).val();
      });

      var invoice_item_data = {};
      i = 0;
      jQuery('#modal_invoice_add #invoice_item_table tbody tr.item_new').each(function(){
        invoice_item_data[i] = {};
        jQuery('td:not(:last-child)', this).each(function(){
          invoice_item_data[i][jQuery(this).attr('item')] = jQuery(this).text();
        });
        i++;
      });

      var form_data = new FormData();                
      form_data.append('invoice_data', JSON.stringify(invoice_data));
      form_data.append('invoice_item_data', JSON.stringify(invoice_item_data));
      form_data.append('invoice_id', invoice_id);
      update_invoice_data(form_data);
    }
  })

  
  // delete invoice
  jQuery(document).on("click", "button#invoice_remove", function(){
  	var id = jQuery('#invoice_list tr.active').attr('id');  
    if (!id) {
      jQuery.alert({
        title: 'Chyba!',
        content: 'Nemáte vybrané žiadne data.',
      });
    } else {
      jQuery.confirm({
        title: 'Odstrániť',
        content: 'Naozaj odstrániť?',
        buttons: {
          confirm: {
          text: 'Áno',
          action: function () {
            remove_data(id);
          }},
          cancel: {
            text: 'Nie'
          }
        }
      });
    }            
  });


  jQuery(document).on("show.bs.modal", "#modal_invoice_add", function(){
    jQuery('#modal_invoice_add label.error, #modal_invoice_add .alert').hide();
    jQuery('#modal_invoice_add select#client').val('0').change();
    jQuery('#modal_invoice_add #invoice_item_table tbody').empty();
  });


  jQuery(document).on("hide.bs.modal", "#modal_invoice_add", function(){
    jQuery('#modal_invoice_add #button_area').empty();
    jQuery('#modal_invoice_add input').val('');
  });


  // add one invoice item to table
  jQuery('#invoice_item_add').on("click", function(){
    if (validate_invoice_item_form()) {
      add_invoice_item();
    }
  });


  // remove one invoice item from table
  jQuery(document).on("click", ".invoice_item_remove", function(){
    var item = jQuery(this);
    jQuery.confirm({
      title: 'Odstrániť',
      content: 'Naozaj odstrániť?',
      buttons: {
        confirm: {
        text: 'Áno',
        action: function () {
          if (item.closest('tr').hasClass('item_new')) {
            item.closest('tr').remove();
          } else {
            remove_invoice_item(item.closest('tr').attr('id'))
          }
        }},
        cancel: {
          text: 'Nie'
        }
      }
    });
    
  });


  /* get all invoices and create DataTables */
  function get_invoice_list() {
    jQuery('#invoice_list').DataTable().clear();
    jQuery('#invoice_list').DataTable().destroy();

    jQuery('#invoice_list').DataTable({
      "order": [[ 0, 'asc' ]], // default order by column
      "responsive": true, // make table responsive
      "processing": true, // show processing indicator
      "serverSide": true, // server side ajax
      "ajax": {
        url: base_url+"index.php/invoice/get_invoice_list",
        type: 'POST',
        error : function(data) {
          alert(JSON.stringify(data));
        },
      },
     "language": {  // translation
      processing:     "Spracúvam...",
      search:         "Hľadať:",
      lengthMenu:     "Zobraziť _MENU_ záznamov",
      info:           "Záznamy _START_ až _END_ z celkom _TOTAL_",
      infoEmpty:      "Záznamy 0 až 0 z celkom 0",
      emptyTable:     "Nie sú k dispozícii žiadne dáta",
      zeroRecords:    "Nenašli sa žiadne vyhovujúce záznamy",
      infoFiltered:   "(vyfiltrované spomedzi _MAX_ záznamov)",
      infoPostFix:    "",
      infoThousands:  ",",
      loadingRecords: "Načítavam...",
      paginate: {
        first:      "Prvá",
        previous:   "Predchádzajúca",
        next:       "Nasledujúca",
        last:       "Posledná" }
      },
      "columns": [
        {"data": "var_sym"},
        {"data": "company"},
        {"data": "created"},
        {"data": "expired"},
        {"data": "invoice"}
      ],
      "columnDefs": [{
          "targets": 'no-sort',
          "orderable": false,
          "order": []
      }]
    });

    // additional buttons
	  jQuery("<button class='btn btn-primary' id='invoice_add'><span class='glyphicon glyphicon-plus'></button>").appendTo('div.dataTables_filter');
    jQuery("<button type='button' id='invoice_edit' class='btn btn-primary'><span class='glyphicon glyphicon-pencil'></span></button>").appendTo('div.dataTables_filter');
    jQuery("<button type='button' id='invoice_remove' class='btn btn-primary'><span class='glyphicon glyphicon-remove'></span></button>").appendTo('div.dataTables_filter');
      
  } 


  function add_invoice_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/invoice/add_invoice_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',
      data: form_data,                         
      type: 'post',
      success: function(data) {
      	jQuery.alert({
	        title: 'Update!',
	        content: 'Záznam pridaná!',
	      });
	      jQuery('#invoice_list').DataTable().ajax.reload();
      },
      error: function(data) {
        jQuery.alert({
          title: 'Error!',
          content: JSON.stringify(data),
        });
      }
    });
  }


  // fill modal with invoice data
  function get_invoice_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/invoice/get_invoice_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',
      data: form_data,                         
      type: 'post',
      success: function(data) {
      	data = JSON.parse(data);
      	invoice_data = data.invoice[0];
      	for (i in invoice_data) {
          jQuery('#modal_invoice_add #'+i).val(invoice_data[i]);
      	}

        invoice_data_item = data.invoice_item;
        for (i in invoice_data_item) {
          var invoice_item = jQuery('<tr id='+invoice_data_item[i]['id']+'><td item="item_descr">'+invoice_data_item[i]['item_descr']+'</td><td item="quantity">'+invoice_data_item[i]['quantity']+'</td><td item="price">'+invoice_data_item[i]['price']+'</td><td><button type="button" class="btn btn-primary invoice_item_remove"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
          invoice_item.appendTo('#modal_invoice_add #invoice_item_table tbody');
        }

        jQuery('#modal_invoice_add select#client').val(invoice_data['client']);
        jQuery('#modal_invoice_add select#client').change();
      }
    });
  }


  // fill select with klients
  function fill_client_dropdown() {
    jQuery.ajax({
      url: base_url+"index.php/invoice/fill_client_dropdown",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',                        
      type: 'post',
      success: function(data) {
        jQuery("select#client").select2({
          data: data
        })
      }
    });
  }

  
  function update_invoice_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/invoice/update_invoice_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',
      data: form_data,                         
      type: 'post',
      success: function(data) {
       	jQuery.alert({
  	      title: 'Update!',
  	      content: 'Data zmenené! ',
  		  });
        jQuery('#invoice_list').DataTable().ajax.reload();
      },
      error: function(data) {
        jQuery.alert({
          title: 'Error',
          content: data,
        });
      }
    });
  }

 
  function remove_data(id) {
  	var form_data = new FormData();             
    form_data.append('invoice_id', id);

    jQuery.ajax({
      url: base_url+"index.php/invoice/remove_invoice_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',       
      data: form_data,                         
      type: 'post',
      success: function(data) {
    	  jQuery.alert('Odstránené!');
	      jQuery('#invoice_list').DataTable().ajax.reload();
      },
      error: function(data) {
        jQuery.alert({
          title: 'Error!',
          content: JSON.stringify(data),
        });
      }
    });
  }


  /* remove invoice item from db */
  function remove_invoice_item(id) {
    var form_data = new FormData();             
    form_data.append('invoice_item_id', id);

    jQuery.ajax({
      url: base_url+"index.php/invoice/remove_invoice_item",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',       
      data: form_data,                         
      type: 'post',
      success: function(data) {
        jQuery('#invoice_item_table tr#'+id).remove();
        jQuery.alert('Odstránené!');
      },
      error: function(data) {
        jQuery.alert({
          title: 'Error!',
          content: JSON.stringify(data),
        });
      }
    });
  }


  // add one item for invoice
  function add_invoice_item() {
    var data = {};
    var invoice_id = jQuery('#modal_invoice_add #invoice_id').val();
    jQuery('#modal_invoice_add #invoice_item_form input').each(function() {
      data[this.id] = jQuery(this).val();
    });

    var invoice_item = jQuery('<tr class="item_new"><td item="item_descr">'+data['item_descr']+'</td><td item="quantity">'+data['quantity']+'</td><td item="price">'+data['price']+'</td><td><button type="button" class="btn btn-primary invoice_item_remove"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
    invoice_item.appendTo('#modal_invoice_add #invoice_item_table tbody');
    jQuery('#modal_invoice_add #invoice_item_form input').val('');
  }
      

});