import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ShopService } from '../../../core/services/shop.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, DecimalPipe, FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss',
})
export class PhotoEditorComponent implements OnInit {
  private shopService = inject(ShopService);

  products = input.required<Product>();
  productChange = output<Product>();
  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Products/' + this.products().id + '/add-photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo: Product = JSON.parse(response);
      const updatedPhotos = { ...this.products() };
      updatedPhotos.photos.push(photo);
      this.productChange.emit(updatedPhotos);
    };
  }
}
