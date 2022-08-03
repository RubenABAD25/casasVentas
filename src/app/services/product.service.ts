import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }

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
}
