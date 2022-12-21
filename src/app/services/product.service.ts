import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Product } from '../models/product';
import { doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  public async create(product: Product, files: File[]) {
    const docId = this.afs.createId();

    product.images = await this.uploadAllImages(docId, files);

    // product.imageUrl = await (await this.uploadImage(docId, file)).ref.getDownloadURL();
    return this.afs.
      collection<Product>('products')
      .doc(docId)
      .set(product);
  }

  public getProducts() {
    return this.afs
      .collection<Product>('products')
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc) {
            const products = doc.map(
              data => {
                const product = data.payload.doc.data();
                product.id = data.payload.doc.id;
                return product;
              }
            );
            return products;
          }
          return [];
        }
        )
      );
  }

  public obtenerNombreImagen(imgUrl: string): string {
    return imgUrl.substring(imgUrl.lastIndexOf('%2F') + 3, imgUrl.lastIndexOf('?alt'));
  }

  private async uploadAllImages(id: string, imagenes: File[]) {
    const urls: string[] = [];
    for (const img of imagenes) {
      const response = await this.uploadImage(id, img);
      urls.push(await response.ref.getDownloadURL());
    }
    return urls;
  }

  private uploadImage(id: string, img: File) {
    const path = `products/${id}/${img.name}`;
    return this.storage.upload(path, img);
  }

  private deleteImage(id: string, name: string) {
    const ref = this.storage.ref(`products/${id}/${name}`);
    return ref.delete();
  }
}
