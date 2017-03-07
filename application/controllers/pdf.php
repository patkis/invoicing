<?php 

  class Pdf extends CI_Controller {


    function __construct() {
      parent::__construct();
      include APPPATH . 'third_party/tcpdf/tcpdf.php';
    }


    public function index() {

      // id of invoice
      $id = $this->input->get('id');

      // get supplier data
      $sql = 'select * from account';
      $query = $this->db->query($sql);
      $account_data = $query->row();

      // get invoice data
      $sql = "select i.*, c.* from invoice i inner join clients c on i.client=c.id where i.id=$id";
      $query = $this->db->query($sql);
      $invoice_data = $query->row();

      // get invoice item data
      $sql = "select * from invoice_item where id_invoice=$id";
      $query = $this->db->query($sql);
      $invoice_item_data = $query->result();

      // create invoice
      $this->create_pdf($account_data, $invoice_data, $invoice_item_data);
    } 
  

    private function create_pdf($account_data, $invoice_data, $invoice_item_data) {

      $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

      // set document information
      $pdf->SetCreator(PDF_CREATOR);
      $pdf->SetAuthor('Patrik Kiss');
      $pdf->SetTitle('Invoice');
      $pdf->SetSubject('Invoice');

      // set default header data
      $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, $account_data->company, 'faktúra '.$invoice_data->var_sym);

      // set header and footer fonts
      $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
      $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

      // set default monospaced font
      $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

      // set margins
      $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
      $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
      $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

      // set auto page breaks
      $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

      // set image scale factor
      $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

      // set font
      $pdf->SetFont('freeserif', '', 10);

      $pdf->AddPage();

      // include template
      include_once 'application/template/invoice_template.php';
            
      // output pdf to browser
      $pdf->writeHTML($html, true, false, true, false, '');
      $pdf->Output('invoice.pdf', 'I');

     } 

}

?>
