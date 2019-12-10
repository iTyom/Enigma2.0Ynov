import { Injectable } from '@angular/core';
import { SocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';

const CHAT_URL = "ws://localhost:8008";

export interface Message {
    author: string;
    message: string;
}

@Injectable()
export class ChatService {

    messages: Subject<any>;



    // Our constructor calls our wsService connect method
    constructor(private wsService: SocketService) {
        //    this.messages = <Subject<Message>>this.wsService.connect(CHAT_URL)
        //        .map((response: any): any => {
        //            return response;
        //        })
    }

    // Our simplified interface for sending
    // messages back to our socket.io server
    sendMsg(msg) {
        this.messages.next(msg);
    }

}