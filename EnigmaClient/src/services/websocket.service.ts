import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
// import { Message } from '../model/message';
import { Event } from '../models/enum';

import * as socketIo from 'socket.io-client';
import { batch } from '../pages/decrypt/decrypt.component';

const SERVER_URL = 'http://localhost:8008';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public sendNotAvailable(timeToWait: number) {
        this.socket.emit('notAvailable', timeToWait);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onBatch(): Observable<any> {
        return new Observable<any>(observer => {
            console.log("observer : ", observer)
            this.socket.on('batch', data => {
                console.log("data : ", data)
                observer.next(data);
            });
        })
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
