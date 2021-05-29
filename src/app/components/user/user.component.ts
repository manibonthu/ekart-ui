import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/roles.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogWidgetComponent } from 'src/app/widgets/dialog-widget/dialog-widget.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}
  users: User[];
  user: User;
  stores: Store[];
  isAdmin: boolean;
  headers = ['_id', 'name', 'email', 'role'];
  ngOnInit(): void {
    this.getUsers();
    this.getUser();
    this.getStores();
  }

  getUser() {
    this.user = this.authService.getProfile();
    this.isAdmin = this.user.role === Role.ADMIN ? true : false;
  }

  getUsers() {
    this.authService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  getStores() {
    this.authService.getStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    });
  }
  addNewUser() {
    this.getStores();
    if (this.stores) {
      const dialogRef = this.dialog.open(DialogWidgetComponent, {
        width: '250px',
        data: {
          config: [
            {
              type: 'input',
              label: 'Name',
              name: 'name',
              matType: 'text',
              placeholder: 'Enter User Name',
              value: '',
              disable: false,
              required: true
            },
            {
              type: 'input',
              label: 'Email',
              name: 'email',
              matType: 'email',
              placeholder: 'Enter User Email',
              value: '',
              disable: false,
              required: true
            },
            {
              type: 'input',
              label: 'Password',
              name: 'password',
              matType: 'password',
              placeholder: 'Enter User Password',
              value: '',
              disable: false,
              required: true
            },
            {
              type: 'select',
              label: 'Store',
              name: 'store',
              options: this.stores,
              placeholder: 'Select Store',
              value: '',
              disable: false,
              required: false
            },
            {
              label: 'Submit',
              name: 'submit',
              type: 'button',
              value: ''
            }
          ]
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.authService
          .createUser({
            name: result.name,
            email: result.email,
            role: Role.USER,
            password: result.password,
            store: result?.store
          })
          .subscribe((result) => this.getUsers());
        this.authService.showMessage(`User  ${result.name} Added Successully`);
      });
    }
  }

  deleteUser(event: User) {
    console.log(event);
    this.authService.deleteUser(event._id).subscribe((result) => {
      this.getUsers();
      this.authService.showMessage(`User  ${event.name} Deleted Successully`);
    });
  }

  editUser(event: User) {
    const dialogRef = this.dialog.open(DialogWidgetComponent, {
      width: '250px',
      data: {
        config: [
          {
            type: 'input',
            label: 'Email',
            name: 'email',
            matType: 'email',
            placeholder: 'Enter User Email',
            value: event.email,
            disable: true,
            required: true
          },
          {
            type: 'input',
            label: 'Id',
            name: '_id',
            matType: 'text',
            placeholder: 'Id',
            value: event._id,
            disable: true,
            required: true
          },
          {
            type: 'input',
            label: 'Name',
            name: 'name',
            matType: 'text',
            placeholder: 'Enter User Name',
            value: event.name,
            disable: false,
            required: true
          },
          {
            type: 'select',
            label: 'Store',
            name: 'store',
            options: this.stores,
            placeholder: 'Select Store',
            value: event.store || '',
            disable: false,
            required: false
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button',
            value: '',
            disable: false
          }
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService
          .updateUser({
            name: result.name,
            store: result?.store || result.store._id,
            _id: result._id
          })
          .subscribe((result) => this.getUsers());
        this.authService.showMessage(
          `User  ${result.name} Updated Successully`
        );
      }
    });
  }
}
