jQuery(document).ready(function(){


  get_client_list();


  jQuery('#nav-client').addClass('active');


  jQuery('#client_list').on('click', '.table-row', function(event) {
    if(jQuery(this).hasClass('active')){
      jQuery(this).removeClass('active'); 
    } else {
      jQuery(this).addClass('active').siblings().removeClass('active');
    }
  });


  jQuery(document).on("click", "#client_add", function() {
  	jQuery('<button type="button" id="save" class="btn btn-primary">Uložiť</button>').appendTo('#modal_client_add #button_area');
  	jQuery('#modal_client_add').modal('show');		  
  });


  jQuery(document).on("click", "#modal_client_add #save", function(){
    if (validate_client_form()) {
      var data = {};
      jQuery('#modal_client_add input:not(#client_id)').each(function() {
		    data[this.id] = jQuery(this).val();
      });
      var form_data = new FormData();                
      form_data.append('client_data', JSON.stringify(data));
      add_client_data(form_data);
    }
  })


  jQuery(document).on("click", "button#client_edit", function(){
  	var form_data = new FormData(); 
    var id = jQuery('#client_list tr.active').attr('id');
    if (!id) {
      jQuery.alert({
        title: 'Chyba!',
        content: 'Nemáte vybrané žiadne data.',
      });
    } else {
  	  jQuery('#modal_client_add #client_id').val(id);               
      form_data.append('client_id', id);
      get_client_data(form_data);
      jQuery('<button type="button" id="update" class="btn btn-primary">Uložiť</button>').appendTo('#modal_client_add #button_area');
      jQuery('#modal_client_add .modal-header h3').text('Upraviť klienta');
      jQuery('#modal_client_add').modal('show');
    }
  })


  jQuery(document).on("click", "#modal_client_add #update", function(){
    if (validate_client_form()) {
      var data = {};
      var client_id = jQuery('#modal_client_add #client_id').val();
      jQuery('#modal_client_add input:not(#client_id)').each(function() {
		    data[this.id] = jQuery(this).val();
      });
      var form_data = new FormData();                
      form_data.append('client_data', JSON.stringify(data));
      form_data.append('client_id', client_id);
      update_client_data(form_data);
    }
  })


  jQuery(document).on("click", "button#client_remove", function(){
  	var id = jQuery('#client_list tr.active').attr('id');  
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


  jQuery(document).on("hide.bs.modal", "#modal_client_add",  function(){
    jQuery('#modal_client_add #button_area').empty();
    jQuery('#modal_client_add input').val('');
  });


  /* get all clients and create DataTables */
  function get_client_list() {
    jQuery('#client_list').DataTable().clear();
    jQuery('#client_list').DataTable().destroy();

    jQuery('#client_list').DataTable({
      "order": [[ 0, 'asc' ]], // default order by column
      "responsive": true, // make table responsive
      "processing": true, // show processing indicator
      "serverSide": true, // server side ajax
      "ajax": {
        url: base_url+"index.php/clients/get_client_list",
        type: 'POST',
      },
     "language": { // translation
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
        {"data": "company"},
        {"data": "fname"},
        {"data": "lname"},
        {"data": "email"},
        {"data": "address"},
        {"data": "country"},
        //{"render": function (data, type, full, meta) {return "<button type='button' id='client_invoice' class='btn btn-primary'><span class='glyphicon glyphicon glyphicon-list-alt'></span></button>";}}
        //{"render": function (data, type, full, meta) {return "<button type='button' id='client_remove' class='btn btn-primary'><span class='glyphicon glyphicon-remove'></span></button>";}}
      ],   
    });

    // additional buttons
	  jQuery("<button class='btn btn-primary' id='client_add'><span class='glyphicon glyphicon-plus'></button>").appendTo('div.dataTables_filter');
    jQuery("<button type='button' id='client_edit' class='btn btn-primary'><span class='glyphicon glyphicon-pencil'></span></button>").appendTo('div.dataTables_filter');
    jQuery("<button type='button' id='client_remove' class='btn btn-primary'><span class='glyphicon glyphicon-remove'></span></button>").appendTo('div.dataTables_filter');
      
  } 


  function add_client_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/clients/add_client_data",  
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
	    jQuery('#client_list').DataTable().ajax.reload();
      }
    });
  }


  // fill modal with client data
  function get_client_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/clients/get_client_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',
      data: form_data,                         
      type: 'post',
      success: function(data) {
      	data = JSON.parse(data);
      	client_data = data[0];
      	for (i in client_data) {
          jQuery('#modal_client_add #'+i).val(client_data[i]);
      	}
      }
    });
  }

  
  function update_client_data(form_data) {
  	jQuery.ajax({
      url: base_url+"index.php/clients/update_client_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',
      data: form_data,                         
      type: 'post',
      success: function(data) {
     	jQuery.alert({
	      title: 'Update!',
	      content: 'Zmenené data: '+data,
		  });
	    jQuery('#client_list').DataTable().ajax.reload();
      }
    });
  }

 
  function remove_data(id) {
  	var form_data = new FormData();             
    form_data.append('client_id', id);

    jQuery.ajax({
      url: base_url+"index.php/clients/remove_client_data",  
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'text',       
      data: form_data,                         
      type: 'post',
      success: function(data) {
    	jQuery.alert('Odstránené!');
	    jQuery('#client_list').DataTable().ajax.reload();
      }
    });
  }
      

});