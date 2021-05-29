import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  template: `
    <div class="dynamic-field form-button" [formGroup]="group">
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="!group.valid"
      >
        {{ config.label }}
      </button>
    </div>
  `,
  styles: []
})
export class FormButtonComponent implements OnInit {
  config;
  group: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
