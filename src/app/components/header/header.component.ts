import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  token: string;
  id: string;
  username: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
    this.username = localStorage.getItem('username');
  }

  ngDoCheck() {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
    this.username = localStorage.getItem('username');
  }

  onLogOut() {
    this.authenticationService.logOut();
  }
}
