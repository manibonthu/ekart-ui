import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { Role } from 'src/app/models/roles.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogWidgetComponent } from 'src/app/widgets/dialog-widget/dialog-widget.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  products: any[];
  stores: any[];
  user: User;
  isAdmin: boolean;
  headers = ['name', 'category', 'description', 'available_quantity', 'store'];
  ngOnInit(): void {
    this.getStores();
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getProfile();
    this.isAdmin = this.user.role === Role.ADMIN ? true : false;
  }

  getStores() {
    this.products = [];

    this.authService.getStores().subscribe((result) => {
      this.stores = result;

      for (const result of this.stores) {
        result.products.forEach((p) => {
          if (this.products) {
            this.products = [...this.products, { ...p, store: result.name }];
          } else {
            this.products = [{ ...p, store: result.name }];
          }
        });
      }
    });
  }

  addNewProduct() {
    const dialogRef = this.dialog.open(DialogWidgetComponent, {
      width: '600px',
      data: {
        config: [
          {
            type: 'input',
            label: 'Name',
            name: 'name',
            matType: 'text',
            placeholder: 'Enter Store Name',
            value: '',
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'category',
            name: 'category',
            matType: 'text',
            placeholder: 'Enter Category',
            value: '',
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Description',
            name: 'description',
            matType: 'text',
            placeholder: 'Enter Product Description',
            value: '',
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Available Quantity',
            name: 'available_quantity',
            matType: 'number',
            placeholder: 'Product Quantity',
            value: '',
            disable: false,
            required: true
          },
          {
            type: 'select',
            label: 'Store',
            name: 'store',
            matType: 'select',
            placeholder: 'Product Store',
            options: this.stores,
            value: '',
            disable: false,
            required: true
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button'
          }
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService
          .createProduct(result)
          .subscribe((res) => this.getStores());
        this.authService.showMessage('New Product Added Successully');
      }
    });
  }

  deleteProduct(event: Store) {
    this.authService
      .deleteProduct(event._id)
      .subscribe((result) => this.getStores());
    this.authService.showMessage(`Product  ${event.name} Deleted Successully`);
  }

  editProduct(event: Product) {
    const dialogRef = this.dialog.open(DialogWidgetComponent, {
      width: '250',
      data: {
        config: [
          {
            type: 'input',
            label: 'Name',
            name: 'name',
            matType: 'text',
            placeholder: 'Enter Store Name',
            value: event.name,
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'category',
            name: 'category',
            matType: 'text',
            placeholder: 'Enter Category',
            value: event.category,
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Description',
            name: 'description',
            matType: 'text',
            placeholder: 'Enter Product Description',
            value: event.description,
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Available Quantity',
            name: 'available_quantity',
            matType: 'number',
            placeholder: 'Product Quantity',
            value: event.available_quantity,
            disable: false,
            required: true
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button'
          }
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.authService
          .updateProduct({ _id: event._id, ...result })
          .subscribe((res) => {
            this.authService.showMessage(
              `Product ${event.name} Updated Successfully`,
              ''
            );
            this.getStores();
          });
      }
    });
  }
}
