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
    validationSlug: string;
    result: string;
    messageDecrypted: string;
    codeString: string;

    constructor(private socketService: SocketService, private authService: AuthService) {
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');
        console.log("TCL: DecryptComponent -> ngOnInit -> this.token", this.token)
        this.initIoConnection();
        this.getCode();
        this.user = new User();
        this.user.login = "Tom";
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
                this.messages.push("lol");

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
        const langage: { langage: string } = { langage: 'js' };
        this.authService.getCode(this.token, langage).subscribe((codeString: string) => {
            this.codeString = codeString;
        });
    }

    public getValidationSlug() {
        this.authService.getValidationSlug(this.token).subscribe((validationSlug: string) => {
            this.validationSlug = validationSlug;
        });
    }

    public getBatch() {
        this.authService.getBatch(this.token).subscribe(async (batch: batch) => {
            this.codeString = this.codeString.replace('[STRING]', '"' + batch.message + '"');
            console.log("code : ", this.codeString)
            //this.messageDecrypted = this.caesarCipher();
            let codeStringCopy;
            for (let i = batch.fromKey; i < batch.toKey; i++) {
                codeStringCopy = this.codeString;
                codeStringCopy = codeStringCopy.replace('[FROMKEY]', i.toString());

                this.messageDecrypted = eval(codeStringCopy);
                console.log("test : ", this.messageDecrypted)
                if (this.messageDecrypted.includes("Tu déconnes pépé !".toUpperCase())) {
                    this.result = "Le message décodé est : " + this.messageDecrypted + " avec la clé : " + i.toString();
                    this.sendMessage(this.messageDecrypted);
                    return this.result;
                } else {

                }
            }

            //this.messageDecrypted = eval(this.codeString);
            //console.log("this.messageDecrypted : ", eval(this.codeString));
        });
    }

    public caesarCipher() {
        //public caesarCipher() {let stringArray = []; for(let i = [FROMKEY];i<[TOKEY];i++){ stringArray.push([STRING].toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - i) % 26 + 65))); }return stringArray;}
        //return "Vw féeqppgu réré ! N\'jqnqecwuvg c xtckogpv gzkuvé".toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - 2) % 26 + 65));
        return "Vw féeqppgu réré ! N'jqnqecwuvg c xtckogpv gzkuvé".toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - 1) % 26 + 65));
    }
}

export interface batch {
    message: string,
    fromKey: number,
    toKey: number,
}
