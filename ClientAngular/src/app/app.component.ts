import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  stringHelper: any = '';
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.stringHelper = localStorage.getItem('user');
    if (this.stringHelper) {
      const user: User = JSON.parse(this.stringHelper);
      this.accountService.setCurrentUser(user);
    }
  }

}
