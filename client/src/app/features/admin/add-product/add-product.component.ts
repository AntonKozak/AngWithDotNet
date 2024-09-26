import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { ShopService } from '../../../core/services/shop.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatButton,
    MatIcon,
    MatInput,
    JsonPipe,
    MatError,
    TextInputComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  private shopService = inject(ShopService);
  private router = inject(Router);
  private snack = inject(SnackbarService);

  validationErrors?: string[];

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    pictureUrl: ['', Validators.required],
    type: ['', Validators.required],
    brand: ['', Validators.required],
    quantityStock: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.addProductForm.value);
    
    if (this.addProductForm.valid) {    
      this.shopService.addProduct(this.addProductForm.value).subscribe({
        next: () => {
          this.snack.success('Product added successfully!');
          this.router.navigate(['/shop']);
        },
        error: (err) => {
          this.validationErrors = err;
          this.snack.error('Failed to add product');
        },
      });
    }
  }
}
