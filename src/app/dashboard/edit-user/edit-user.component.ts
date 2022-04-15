import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id: string | null;
  isNewUser = true;
  userForm: FormGroup;
  maxDate = new Date();
  constructor(private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.actRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('id', this.id);
      this.isNewUser = false;
    });
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      'FN': new FormControl('', [Validators.required]),
      'MN': new FormControl('', [Validators.required]),
      'LN': new FormControl('', [Validators.required]),
      'DOB': new FormControl(new Date(), [Validators.required])
    })
  }

  onSubmit(): void {
    // display some fireworks
  }

}
