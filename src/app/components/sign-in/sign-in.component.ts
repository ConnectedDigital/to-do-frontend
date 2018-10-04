import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInSubscription: Subscription;
  signInForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.signInSubscription = this.authenticationService.getToken(email, password)
      .subscribe(res => this.authenticationService.logIn(res.token),
          error => console.log(error));
  }

  ngOnDestroy() {
    if (this.signInSubscription !== undefined) {
      this.signInSubscription.unsubscribe();
    }
  }
}
