<!DOCTYPE html>
<html lang='sk'>

<head>
  <title>Invoicing</title>

  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.1.1/css/responsive.bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.1.0/jquery-confirm.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.6/select2-bootstrap.css">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css">
  <link rel="stylesheet" href="<?php echo base_url(); ?>css/style.css">

  <script type='text/javascript' src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script type='text/javascript' src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type='text/javascript' src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
  <script type='text/javascript' src="https://cdn.datatables.net/1.10.13/js/dataTables.bootstrap.min.js"></script>
  <script type='text/javascript' src="https://cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js"></script>
  <script type='text/javascript' src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
  <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.1.0/jquery-confirm.min.js"></script>
  <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
  <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.js"></script>
  <script type='text/javascript' src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  <script type='text/javascript' src="<?php echo base_url(); ?>js/validate.js"></script>

  <script>
    var base_url = "<?php echo base_url(); ?>";
  </script>
</head>

<body>
  <div class="container">
    <div class="jumbotron text-center">
      <h1>Invoicing</h1> 
    </div>

    <ul class="nav nav-pills">
      <li id="nav-invoice"><a href="<?php echo base_url(); ?>invoice/">Faktúry</a></li>
      <li id="nav-client"><a href="<?php echo base_url(); ?>clients/">Adresár</a></li>
      <li id="nav-account"><a href="<?php echo base_url(); ?>account/">Moje údaje</a></li>
    </ul>

