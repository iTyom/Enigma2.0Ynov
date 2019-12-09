import { Component, OnInit } from '@angular/core';
import { User } from '../../models/login.model'
import { AuthService } from '../../services/auth.service';
import { ChatService } from 'src/services/test.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService, public chat: ChatService) {
  }

  ngOnInit() {
    this.user = new User();
    this.user.password = "Tom";
    this.user.login = "Tom";
    this.chat.messages.subscribe(msg => {
      console.log(msg);
    })
  }

  login() {
    const loginEncode: string = btoa(this.user.login + ':' + this.user.password);

    this.authService.login(loginEncode).subscribe((data: User) => {
      this.user = data;
      if (this.user.token) {
        this.authService.getCode(this.user.token, 'js').subscribe((dataCode: any) => {
          console.log("data : ", dataCode);
          this.sendMessage("Hello it's loggin's function !");
        })
      }
    })
  }

  sendMessage(msg) {
    this.chat.sendMsg(msg);
  }
}
