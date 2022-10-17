import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  url = 'http://localhost:3000/transactions';
  constructor(private httpClient: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(this.url);
  }

  addNewTransaction(transaction: Transaction): Observable<Transaction>{
   return this.httpClient.post<Transaction>(this.url, transaction);
  }
}
