<?php 

  class Invoice extends CI_Controller {
  

    public function index() {
      $this->load->view('header');
      $this->load->view('invoice_list');
      $this->load->view('invoice_modal');
      $this->load->view('footer');
    } 


    /* get all invoices and return json for DataTables */
    public function get_invoice_list() {
      $post_params = $this->input->post();

      /* search, order, limit */
      $filters = $this->get_table_filters($post_params);
      
      /* query count */
      $sql_count = "select i.var_sym, i.created, i.expired, c.company from invoice i inner join clients c on i.client=c.id where {$filters['where']}";
      $query = $this->db->query($sql_count);
      $num_rows = $query->num_rows();

      /* query data */
      $sql = "select i.id, i.var_sym, i.created, i.expired, c.company from invoice i inner join clients c on i.client=c.id where {$filters['where']} order by {$filters['orderBy']} {$filters['orderType']} limit {$filters['length']} offset {$filters['start']}";
      $query = $this->db->query($sql);
      $invoice_data = $query->result();
      
      $data['data'] = array();

      if (!empty($invoice_data)) {
        foreach ($invoice_data as $row ) {
          $row->DT_RowId = $row->id;
          $row->DT_RowClass = "table-row";
          $row->invoice = "<a id='".$row->id."' href='http://localhost:8888/invoicing/index.php/pdf/?id=".$row->id."' target=_blank><span class='glyphicon glyphicon-list-alt'></span></a>"; // button for gnerating invoice
          $data['data'][] = $row ;
        }
      }

      $response = array(
        "draw" => $post_params["draw"],
        "recordsTotal" => $num_rows,
        "recordsFiltered" => $num_rows,
        "data" => $data['data']
      );

      echo json_encode($response);

    }


    /* existing clients for select list */
    public function fill_client_dropdown() {
      $sql = "select id, company as text from clients order by fname";
      $query = $this->db->query($sql);
      $client_data = $query->result();
      echo json_encode($client_data);
    }


    /* get data for one invoice with invoice item */
    public function get_invoice_data() {
      $invoice_id = $this->input->post('invoice_id');
      $sql = "select * from invoice where id=$invoice_id";
      $query = $this->db->query($sql);
      $invoice_data['invoice'] = $query->result();

      $sql = "select id, item_descr, quantity, price from invoice_item where id_invoice=$invoice_id";
      $query = $this->db->query($sql);
      $invoice_data['invoice_item'] = $query->result();

      echo json_encode($invoice_data);
    }


    /* add invoice and item if existin post */
    public function add_invoice_data() {
      $invoice_data = json_decode($this->input->post('invoice_data')); 
      $this->db->insert("invoice", $invoice_data);
      $last_id = $this->db->insert_id();

      if ($last_id) {
        $invoice_item_data = json_decode($this->input->post('invoice_item_data'));
        if (count((array)$invoice_item_data) != 0) {
          foreach ($invoice_item_data as $invoice_item) {
            $invoice_item->id_invoice = $last_id;
            $this->db->insert("invoice_item", $invoice_item);
          }
        }
      }
    }


    /* edit invoice and invoice item */
    public function update_invoice_data() {
      $invoice_data = json_decode($this->input->post('invoice_data'));
      $invoice_id = $this->input->post('invoice_id');

      $this->db->set($invoice_data); 
      $this->db->where("id", $invoice_id); 
      $this->db->update("invoice", $invoice_data);

      $invoice_item_data = json_decode($this->input->post('invoice_item_data'));
      if (count((array)$invoice_item_data) != 0) {
        foreach ($invoice_item_data as $invoice_item) {
          $invoice_item->id_invoice = $invoice_id;
          $this->db->insert("invoice_item", $invoice_item);
        }
      }

    }


    /* delete invoice */
    public function remove_invoice_data() {
      $invoice_id = json_decode($this->input->post('invoice_id')); 
      $this->db->delete("invoice", "id=".$invoice_id);
      $this->db->delete("invoice_item", "id_invoice=".$invoice_id);
    }


    public function remove_invoice_item() {
      $item_id = json_decode($this->input->post('invoice_item_id'));
      $this->db->delete("invoice_item", "id=".$item_id);
    }


    /* search, order, limit */
    private function get_table_filters($post_params) {
        $filters = array();
        $filters['draw'] = $post_params["draw"];
        $filters['orderByColumnIndex'] = $post_params['order'][0]['column'];
        $filters['orderBy'] = $post_params['columns'][$filters['orderByColumnIndex']]['data'];
        $filters['orderType'] = $post_params['order'][0]['dir'];
        $filters['start'] = $post_params["start"];
        $filters['length'] = $post_params['length'];

        $search_columns = array('fname','lname','var_sym','created','expired');

        foreach ($search_columns as $search_column) {
            $where[] = "$search_column like '%".$post_params['search']['value']."%'";
        }
        $filters['where'] = implode(" OR " , $where);

        return $filters;
    }


  } 


?>
