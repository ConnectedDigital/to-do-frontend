import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpSubscription: Subscription;
  signUpForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const passwordMatchValidator = (g: FormGroup) => {
      return g.get('setPassword').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    };

    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required]),
      'password': new FormGroup({
        'setPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      }, passwordMatchValidator)
    });
  }

  onSubmit() {
    const username = this.signUpForm.get('username').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').get('confirmPassword').value;

    const user = new User(username, email, password);

    this.signUpSubscription = this.authenticationService.signUp(user)
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  ngOnDestroy() {
    if (this.signUpSubscription !== undefined) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
