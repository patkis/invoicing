  <div id="modal_invoice_add" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h3>Pridať faktúru</h3>
          </div>
          <div class="modal-body">
            <div class="alert alert-success">
              Záznam vložený!
            </div>
            <div class="alert alert-danger">
              Chyba!
            </div>  

            <?php echo form_open('', array('id' => 'invoice_form','class' => 'form-horizontal'))?>
              <div class="form-group">
                <?php echo form_label('Klient:', 'client', array('class' => 'control-label col-sm-3'));?>
                <div class="col-sm-3">
                  <?php echo form_dropdown('client', array('O' => ''), '', array('id' => 'client', 'class' => 'form-control')); ?>
                </div>
                <?php echo form_label('Číslo faktúry:', 'var_sym', array('class' => 'control-label col-sm-3 '));?>
                <div class="col-sm-3">
                  <?php echo form_input(array('name' => 'var_sym', 'id' => 'var_sym', 'class' => 'form-control'));?>
                </div>
              </div>
              <div class="form-group">
                <?php echo form_label('Dátum vystavenia:', 'created', array('class' => 'control-label col-sm-3'));?>
                <div class="col-sm-3">
                  <?php echo form_input(array('name' => 'created', 'id' => 'created', 'class' => 'form-control', 'data-provide' => 'datepicker'));?>
                </div>
                <?php echo form_label('Dátum splatnosti:', 'expired', array('class' => 'control-label col-sm-3'));?>
                <div class="col-sm-3">
                  <?php echo form_input(array('name' => 'expired', 'id' => 'expired', 'class' => 'form-control'));?>
                </div>
              </div>
            <?php echo form_close()?>


            <?php echo form_open('', array('id' => 'invoice_item_form','class' => 'form'))?>
              <hr>
              <div class="form-group col-sm-6">
                <?php echo form_label('Názov:', 'item_descr', array('class' => 'control-label'));?>
                <div>
                  <?php echo form_input(array('name' => 'item_descr', 'id' => 'item_descr', 'class' => 'form-control'));?>
                </div>
              </div>
              <div class="form-group col-sm-2">
                <?php echo form_label('Množstvo:', 'quantity', array('class' => 'control-label'));?>
                <div>
                  <?php echo form_input(array('name' => 'quantity', 'type' => 'number', 'id' => 'quantity', 'class' => 'form-control'));?>
                </div>
              </div>
              <div class="form-group col-sm-2">
                <?php echo form_label('Suma:', 'price', array('class' => 'control-label'));?>
                <div>
                  <?php echo form_input(array('name' => 'price', 'id' => 'price', 'class' => 'form-control'));?>
                </div>
              </div>
              <div class="form-group col-sm-2">
                <?php echo form_label('&nbsp;', '', array('class' => 'control-label'));?>
                <div>
                  <button type="button" id="invoice_item_add" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span></button>
                  <!--<button type="button" id="invoice_item_add2" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span></button>-->
                </div>
              </div>
            <?php echo form_close()?>


            <div class="table-responsive row">  
              <div class="col-sm-12">        
                <table class="table" id="invoice_item_table">
                  <thead>
                    <tr>
                      <th>Názov</th>
                      <th>Množstvo</th>
                      <th>Suma</th>
                      <th><th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>


            <div class="col-sm-offset-4 col-sm-8" id="button_area"></div>
            <input type="hidden" id="invoice_id" value="">


          </div>
      </div>
    </div>
  </div>