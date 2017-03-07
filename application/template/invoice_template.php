<?php

  $html = "

    <style>
      td,th {
        border:1px solid black;
      }
      tr th {
        background-color: #2980b9;
        color: #FFF;
      }
      h1 {
        text-align:center;
      }
      </style>

      <h1>Faktúra </h1>

      <table>
        <tr>
          <td>
            <strong>Dodávatel:</strong><br>
            $account_data->company<br>
            $account_data->fname $account_data->lname<br>
            <strong>IČO:</strong> $account_data->ico<br>
            <strong>DIČ:</strong> $account_data->dic<br>
            <strong>IČ DPH:</strong> $account_data->icdph
          </td>
          <td>
            <strong>Odberatel:</strong><br>
            $invoice_data->company<br>
            $invoice_data->fname $account_data->lname<br>
            <strong>IČO:</strong> $invoice_data->ico<br>
            <strong>DIČ:</strong> $invoice_data->dic<br>
            <strong>IČ DPH:</strong> $invoice_data->icdph
          </td>
        </tr> 
        
        <br><br>
        
        <tr>
          <td colspan='2'>
            <strong>Variabilný symbol: </strong>$invoice_data->var_sym<br>
            <strong>Dátum vystavenia: </strong>".date('d-m-Y', strtotime($invoice_data->created))."<br>
            <strong>Dátum splatnosti: </strong>".date('d-m-Y', strtotime($invoice_data->expired))."
          </td>
        </tr> 
      </table>

      <table>
        <br><br><br>
        <tr>
          <th>
            <strong>Popis položky</strong>
          </th>    
          <th>
            <strong>Množstvo</strong>
          </th>    
          <th>
            <strong>Cena</strong>
          </th>      
        </tr>";

        foreach ($invoice_item_data as $item_data) {
          static $total = 0;
            
          $html .= "
            <tr>
              <td>  $item_data->item_descr</td>
              <td>  $item_data->quantity</td>
              <td>  $item_data->price &euro;  </td>
            </tr>
          ";
          $total += (float) $item_data->price;
        }

  $html .= '<tr><td colspan="2"><strong>  Celkom na úhradu:</strong></td><td><strong>   '.$total.' &euro;</strong></td></tr>' ;

  $html .= '</table>';

?>