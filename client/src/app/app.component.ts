import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { Pagination } from './shared/Models/Pagination';
import { Product } from './shared/Models/Products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  title = "Antonio's Angular App";

  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => console.error,
      complete: () => console.log('complete'),
    });
  }
}
