<?php 

  class Account extends CI_Controller {
  

    public function index() {
      $this->load->view('header');
      $this->load->view('account_page');
      $this->load->view('footer');
    } 


    /* get account data */
    public function get_account_data() {
      $sql = "select company,fname,lname,email,street,zip,city,country,ico,dic,icdph from account";
      $query = $this->db->query($sql);
      $account_data = $query->result();
      echo json_encode($account_data);
    }


    /* edit account data */
    public function update_account_data() {
      $account_data = json_decode($this->input->post('account_data'));
      $this->db->set($account_data);
      $this->db->update("account", $account_data);
    }


  } 

?>
