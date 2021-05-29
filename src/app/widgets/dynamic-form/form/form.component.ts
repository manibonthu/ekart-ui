import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input()
  config: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {}
  @Output()
  submitted = new EventEmitter();
  ngOnInit() {
    this.form = this.createGroup();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.valid);
      this.submitted.emit(this.form.getRawValue());
    }
  }
  createGroup() {
    const group = this.fb.group({});
    this.config.forEach((control) =>
      group.addControl(
        control.name,
        this.fb.control(
          { value: control.value, disabled: control.disable },
          control.required ? Validators.required : {}
        )
      )
    );
    return group;
  }
}
