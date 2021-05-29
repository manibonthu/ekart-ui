import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-widget',
  templateUrl: './dialog-widget.component.html',
  styleUrls: ['./dialog-widget.component.scss']
})
export class DialogWidgetComponent implements OnInit, OnChanges {
  config: any;
  constructor(
    public dialogRef: MatDialogRef<DialogWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.config = [];
    this.config = this.data.config;
  }
  ngOnChanges() {
    this.config = this.data.config;
  }
  formSubmitted(value) {
    this.dialogRef.close(value);
  }
}
