import { Component, OnInit } from '@angular/core';
import { User } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/websocket.service';

import { Action } from '../../models/enum';
import { Event } from '../../models/enum';
@Component({
    selector: 'app-decrypt',
    templateUrl: './decrypt.component.html',
    styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {

    public user: User;
    // action = Action;
    // user: User;
    messages: string[] = [];
    messageContent: string;
    ioConnection: any;
    action = Action;
    token: string;
    constructor(private socketService: SocketService, private authService: AuthService) {
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');
        console.log("TCL: DecryptComponent -> ngOnInit -> this.token", this.token)
        this.initIoConnection();
        this.getCode();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
                this.messages.push(message);

            });

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.user,
            content: message
        });
        this.messageContent = null;
    }

    public getCode() {
        this.authService.getCode(this.token, 'js').subscribe((dataCode: any) => {
            console.log('data : ');

            //this.sendMessage('Hello it\'s loggin\'s function !');
        });
    }


}
