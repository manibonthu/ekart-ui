import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/roles.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss']
})
export class TableWidgetComponent implements OnChanges {
  @Input() sourceData: any[];
  @Input() headers: string[];
  @Input() editAccess?: boolean;
  @Input() deleteAccess?: boolean;
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  user: User;
  isEdit: boolean;
  isDelete: boolean;
  constructor(private authService: AuthService) {}

  displayedColumns: string[] = ['action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isAdmin: boolean;
  ngOnChanges() {
    this.user = this.authService.getProfile();
    this.isEdit =
      this.user.role === Role.ADMIN || this.editAccess ? true : false;
    this.isDelete =
      this.user.role === Role.ADMIN || this.deleteAccess ? true : false;

    this.dataSource = new MatTableDataSource(this.sourceData);
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['action'];

    this.displayedColumns.unshift(...this.headers);
  }

  editContent(element) {
    this.editEvent.next(element);
  }
  deleteContent(element) {
    this.deleteEvent.emit(element);
  }
}
