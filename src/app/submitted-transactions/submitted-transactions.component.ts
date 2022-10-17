import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Transaction } from '../models/transaction';
import transactionData from '../../assets/data/transaction.json';

@Component({
  selector: 'app-submitted-transactions',
  templateUrl: './submitted-transactions.component.html',
  styleUrls: ['./submitted-transactions.component.scss']
})
export class SubmittedTransactionsComponent{

  
  constructor(private _liveAnnouncer: LiveAnnouncer) { }
  displayedColumns: string[] = ['position', 'Customername', 'Transferamount', 'TransferCurrency','Reference'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);transactionData
  dataSource = new MatTableDataSource<Transaction>(transactionData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
