import { CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { CartService } from '../../../core/services/cart.service';
import { ShopService } from '../../../core/services/shop.service';
import { PhotoEditorComponent } from '../../../shared/components/photo-editor/photo-editor.component';
import { IsAdminDirective } from '../../../shared/directives/is-admin.directive';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    FormsModule,
    IsAdminDirective,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    PhotoEditorComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopSrvice = inject(ShopService);
  private accountService = inject(AccountService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private fb = inject(FormBuilder);
  product?: Product;
  quantityInCart = 0;
  quantity = 1;
  isAdmin = this.accountService.isAdmin();

  ngOnInit() {
    this.loadProduct();
  }

  productForm = this.fb.group({
    id: [this.product?.id],
    name: [this.product?.name],
    description: [''],
    price: [''],
    pictureUrl: [''],
    type: [''],
    brand: [''],
    quantityInStock: [''],
  });

  onSubmit() {
    if (!this.product) return;

    this.shopSrvice
      .updateProduct(this.productForm.value.id, this.productForm.value)
      .subscribe({
        next: () => {
          console.log('Product updated');
          this.loadProduct();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.shopSrvice.getProductWithPictures(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateQuantityInCart();

        this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          price: this.product.price.toString(),
          pictureUrl: this.product.pictureUrl,
          type: this.product.type,
          brand: this.product.brand,
          quantityInStock: this.product.quantityInStock.toString(),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateQuantityInCart() {
    this.quantityInCart =
      this.cartService
        .cart()
        ?.items.find((x) => x.productId === this.product?.id)?.quantity || 0;

    this.quantity = this.quantityInCart || 1;
  }

  updateCart() {
    if (!this.product) return;

    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemsToCart(this.product, itemsToAdd);
    } else {
      const itemToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemToRemove);
    }
  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart';
  }

  onProductChange(event: Product) {
    this.product = event;
  }
}
