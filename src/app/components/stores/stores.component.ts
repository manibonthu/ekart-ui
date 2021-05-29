import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/roles.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogWidgetComponent } from 'src/app/widgets/dialog-widget/dialog-widget.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}
  stores: any;
  user: User;
  isAdmin: boolean;
  headers = ['_id', 'name', 'phone', 'location'];
  ngOnInit(): void {
    this.getStores();
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getProfile();
    this.isAdmin = this.user.role === Role.ADMIN ? true : false;
  }

  getStores() {
    this.authService.getStores().subscribe((result) => {
      this.stores = result;
    });
  }

  addNewStore() {
    const dialogRef = this.dialog.open(DialogWidgetComponent, {
      width: '250px',
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
            label: 'Location',
            name: 'location',
            matType: 'text',
            placeholder: 'Enter Store Location',
            value: '',
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Contact Number',
            name: 'phone',
            matType: 'number',
            placeholder: 'Enter Store Contact Number',
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
      this.authService
        .createStore({
          name: result.name,
          location: result.location,
          phone: result.phone
        })
        .subscribe();
      this.getStores();
      this.authService.showMessage(`Store  ${result.name} Added Successully`);
    });
  }

  deleteStore(event: Store) {
    this.authService.deleteStore(event._id).subscribe((result) => {
      this.getStores();
      this.authService.showMessage(`Store  ${event.name} Deleted Successully`);
    });
  }

  editStore(event: Store) {
    const dialogRef = this.dialog.open(DialogWidgetComponent, {
      width: '250px',
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
            label: 'Location',
            name: 'location',
            matType: 'text',
            placeholder: 'Enter Store Location',
            value: event.location,
            disable: false,
            required: true
          },
          {
            type: 'input',
            label: 'Contact Number',
            name: 'phone',
            matType: 'number',
            placeholder: 'Enter Store Contact Number',
            value: event.phone,
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

    dialogRef.afterClosed().subscribe((result: Store) => {
      if (result) {
        this.authService
          .updateStore({
            name: result.name,
            location: result.location,
            phone: result.phone,
            _id: event._id
          })
          .subscribe((res) => this.getStores());
        this.authService.showMessage(
          `Store  ${result.name} Updated Successully`
        );
      }
    });
  }
}

// { config : [
//   {
//     type: 'input',
//     label: 'Name',
//     name: 'name',
//     placeholder: 'Enter Store Name',
//   },
//   {
//     type: 'select',
//     label: 'Favourite food',
//     name: 'food',
//     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
//     placeholder: 'Select an option',
//   },
//   {
//     label: 'Submit',
//     name: 'submit',
//     type: 'button',
//   },
// ]}
