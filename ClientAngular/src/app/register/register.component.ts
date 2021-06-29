import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = new FormGroup({
      gender: new FormControl('male'),
      username: new FormControl('', [Validators.required]),
      knownAs: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      confirmPassword: new FormControl('', [Validators.required,]),
    });

    // this.registerForm.validator = this.isMatching('password', 'confirmPassword');
  }

  isMatching(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.isMatching) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ isMatching: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

}
