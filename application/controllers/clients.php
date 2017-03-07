<?php 

  class Clients extends CI_Controller {
  

    public function index() {
      $this->load->view('header');
      $this->load->view('client_list');
      $this->load->view('client_modal');
      $this->load->view('footer');
    } 


    /* get all clients and return json for DataTables */
    public function get_client_list() {
      $post_params = $this->input->post();

      /* search, order, limit */
      $filters = $this->get_table_filters($post_params);
      
      /* query count */
      $sql_count = "select id,company,fname,lname,email,concat(street,', ',zip,', ',city) as address,country from clients where {$filters['where']} and is_valid";
      $query = $this->db->query($sql_count);
      $num_rows = $query->num_rows();

      /* query data */
      $sql = "select id,company,fname,lname,email,concat(street,', ',zip,', ',city) as address,country from clients where {$filters['where']} and is_valid order by {$filters['orderBy']} {$filters['orderType']} limit {$filters['length']} offset {$filters['start']}";
      $query = $this->db->query($sql);
      $client_data = $query->result();
      
      $data['data'] = array();

      if (!empty($client_data)) {
        foreach ($client_data as $row ) {
          $row->DT_RowId = $row->id;
          $row->DT_RowClass = "table-row";
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


    /* get data for one client */
    public function get_client_data() {
      $client_id = $this->input->post('client_id');
      $sql = "select * from clients where is_valid and id=$client_id";
      $query = $this->db->query($sql);
      $client_data = $query->result();
      echo json_encode($client_data);
    }


    /* addclient to db */
    public function add_client_data() {
      $client_data = json_decode($this->input->post('client_data')); 
      $this->db->insert("clients", $client_data);
      echo $this->db->affected_rows();
    }


    /* edit client */
    public function update_client_data() {
      $client_data = json_decode($this->input->post('client_data'));
      $client_id = $this->input->post('client_id');
      $this->db->set($client_data); 
      $this->db->where("id", $client_id); 
      $this->db->update("clients", $client_data);
      echo $this->db->affected_rows();
    }


    /* delete client */
    public function remove_client_data() {
      $client_id = json_decode($this->input->post('client_id')); 
      echo $client_id;
      $this->db->delete("clients", "id =".$client_id);
      echo $this->db->affected_rows();
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

        $search_columns = array('company','fname','lname','email','street','city','zip','country');

        foreach ($search_columns as $search_column) {
            $where[] = "$search_column like '%".$post_params['search']['value']."%'";
        }
        $filters['where'] = implode(" OR " , $where);

        return $filters;
    }

  } 

?>
