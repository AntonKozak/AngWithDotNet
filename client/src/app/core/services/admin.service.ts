import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../../shared/models/order';
import { OrderParams } from '../../shared/models/orderParams';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getOrders(ordersParams: OrderParams) {
    let params = new HttpParams();
    if (ordersParams.filter && ordersParams.filter !== 'All') {
      params = params.append('status', ordersParams.filter);
    }
    params = params.append('pageIndex', ordersParams.pageNumber);
    params = params.append('pageSize', ordersParams.pageSize);

    return this.http.get<Pagination<Order>>(this.baseUrl + 'admin/orders', {
      params,
    });
  }

  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'admin/orders/' + id);
  }

  refundOrder(id: number) {
    return this.http.post<Order>(
      this.baseUrl + 'admin/orders/refund/' + id,
      {},
    );
  }
}
