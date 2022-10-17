import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import customerData from '../../assets/data/customer.json';
import transactionData from '../../assets/data/transaction.json';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-transactions',
  templateUrl: './new-transactions.component.html',
  styleUrls: ['./new-transactions.component.scss']
})
export class NewTransactionsComponent implements OnInit{

  hasError: boolean;
  message: string='show message!';
  name = 'Angular'; 
  reference: string ='';
  customerNumber: string = '';
  customerName: string = '';
  customerAddress: string = '';
  customerPhoneNumber: string = '';
  transferAmount: number = 0;
  transferCurrency: string = '';
  beneficiaryBank: string = '';
  beneficiaryAccountNumber: string = '';
  paymentDetails: string = '';
  creditDebitCard: string = '';
  cvv: string = '';
  validThrough: string = '';
  region: string = '';

  constructor(private toastr: ToastrService){}

  ngOnInit(): void {
    const format = 'YYYYMMDD';
    const formattedDate = formatDate(new Date(), format, 'en-US');
    var sequence = Math.floor((Math.random() * 9999) + 999);
    this.reference = 'CUS'+ formattedDate + sequence;
  }

  addTransaction(newTransactionForm:any) {  
    console.log(newTransactionForm.value);
    let transaction = {
      "id": newTransactionForm.value.customerNumber,
      "customerName": newTransactionForm.value.customerName!,
      "reference": newTransactionForm.value.reference,
      "transferCurrency": newTransactionForm.value.transferCurrency,
      "transferAmount": newTransactionForm.value.transferAmount
    };
    transactionData.push(transaction);
    this.toastr.success('Transaction Added Successfully');
    newTransactionForm.reset();
  }



  onCustomerNumberChange(){
    if(customerData.CUST_INFO.CUST_NO == this.customerNumber){
      this.customerName = customerData.CUST_INFO.SHORT_NAME;
      this.customerPhoneNumber = customerData.CUST_INFO.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE; 
      this.customerAddress = customerData.CUST_INFO.STREET_ADDR + customerData.CUST_INFO.TOWN_COUNTRY 
      + customerData.CUST_INFO.COUNTRY + customerData.CUST_INFO.POST_CODE;
    }
  }
}
