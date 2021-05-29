import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  template: `
    <div class="dynamic-field form-select" [formGroup]="group">
      <mat-form-field>
        <mat-label>{{ config.label }}</mat-label>
        <mat-select [formControlName]="config.name">
          <mat-option>{{ config.placeholder }}</mat-option>
          <mat-option *ngFor="let option of config.options" [value]="option">
            {{ option.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: []
})
export class FormSelectComponent implements OnInit {
  config;
  group: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
