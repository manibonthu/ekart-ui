import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  template: `
    <div class="dynamic-field form-input" [formGroup]="group">
      <mat-form-field class="example-full-width">
        <mat-label>{{ config.label }}</mat-label>
        <input
          #input
          matInput
          [type]="config.matType"
          [attr.placeholder]="config.placeholder"
          [formControlName]="config.name"
          [value]="config.value"
        />
        <div *ngIf="input.errors?.required">{{ config.label }}</div>
      </mat-form-field>
    </div>
  `,
  styles: []
})
export class FormInputComponent implements OnInit {
  config;
  group: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
