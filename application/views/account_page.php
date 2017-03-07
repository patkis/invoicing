  <div id="account_wrap" class="row">
    <?php echo form_open('', array('id' => 'account_form','class' => 'form-horizontal'))?>
      <div class="form-group">
        <?php echo form_label('Firma:', 'company', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'company', 'id' => 'company', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Meno:', 'fname', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'fname', 'id' => 'fname', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Priezvisko:', 'lname', array('class' => 'control-label col-sm-4'));?>
          <div class="col-sm-4">
            <?php echo form_input(array('name' => 'lname', 'id' => 'lname', 'class' => 'form-control'));?>
          </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Email:', 'email', array('class' => 'control-label col-sm-4'));?>
          <div class="col-sm-4">
            <?php echo form_input(array('name' => 'email', 'id' => 'email', 'class' => 'form-control'));?>
          </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Ulica:', 'street', array('class' => 'control-label col-sm-4'));?>
          <div class="col-sm-4">
            <?php echo form_input(array('name' => 'street', 'id' => 'street', 'class' => 'form-control'));?>
          </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Mesto:', 'city', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'city', 'id' => 'city', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('PSČ:', 'zip', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'zip', 'id' => 'zip', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('Štát:', 'country', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'country', 'id' => 'country', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('IČO:', 'ico', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'ico', 'id' => 'ico', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('DIČ:', 'dic', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'dic', 'id' => 'dic', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group">
        <?php echo form_label('IČDPH:', 'icdph', array('class' => 'control-label col-sm-4'));?>
        <div class="col-sm-4">
          <?php echo form_input(array('name' => 'icdph', 'id' => 'icdph', 'class' => 'form-control'));?>
        </div>
      </div>
      <div class="form-group"> 
        <div class="col-sm-offset-4 col-sm-8">
            <button type="button" id="save_account" class="btn btn-primary">Uložiť</button>
        </div>
      </div>
      <?php echo form_close()?>    
  </div>

  <script type='text/javascript' src="<?php echo base_url(); ?>js/account.js"></script>