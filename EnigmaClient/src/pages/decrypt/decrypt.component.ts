import { Component, OnInit } from '@angular/core';
import { User } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/websocket.service';

import { Action } from '../../models/enum';
import { Event } from '../../models/enum';
import { stringify } from 'querystring';
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
    codeToExecute: string;
    error: string;
    messageCrypted: string;
    batch: batch;

    constructor(private socketService: SocketService, private authService: AuthService) {
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');
        this.initIoConnection();
        this.getCodeToExecute();
        this.user = new User();
        this.user.login = "Tom";
        this.waitBatch()
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
                this.messages.push("lol");
            });

        // this.socketService.onBatch().subscribe(batch => {
        //     console.log("batch", batch)
        //     this.batch = batch;
        // })

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });
    }

    public onBatch() {
        this.socketService.onBatch().subscribe(batch => {
            console.log("batch", batch)
            this.batch = batch;
        })
    }

    public async waitBatch() {
        if (this.batch)
            this.onBatch();
        await this.delay(10000);

        this.waitBatch();
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.user,
            content: this.messageDecrypted
        });
        this.messageContent = this.messageDecrypted;
    }

    public getCodeToExecute() {
        const langage: { langage: string } = { langage: 'js' };
        const response = this.authService.getCodeToExecute(this.token, langage).toPromise();
        response.catch(data => {
            this.error = data.error.message;
            console.log(data)
        }).then(codeToExecute => {
            //this.codeString = String.
            this.codeToExecute = atob(codeToExecute as string);
            console.log("ok", this.codeToExecute);
        });
    }

    public getValidationSlug() {
        this.authService.getValidationSlug(this.token).subscribe((validationSlug: string) => {
            this.validationSlug = validationSlug;
        });
    }

    public getBatch() {
        this.authService.getBatch(this.token).subscribe(async (batch: batch) => {
            this.messageCrypted = batch.message;
            this.codeToExecute = this.codeToExecute.replace('[STRING]', '"' + batch.message + '"');
            console.log("code : ", this.codeToExecute)
            //this.messageDecrypted = this.caesarCipher();
            let codeToExecuteCopy;
            for (let i = batch.fromKey; i < batch.toKey; i++) {
                codeToExecuteCopy = this.codeToExecute;
                codeToExecuteCopy = codeToExecuteCopy.replace('[FROMKEY]', i.toString());

                this.messageDecrypted = eval(codeToExecuteCopy);
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
    idMessage: number,
    fromKey: number,
    toKey: number,
}
