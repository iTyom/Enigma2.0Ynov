import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authApi = "http://localhost:8004/auth/login";
    private enigmaApi = "http://localhost:8008/enigma/getCode"
    constructor(private httpClient: HttpClient) { }

    public login(login: string) {
        let headers = new HttpHeaders();
        console.log("loginEncoded:", login)
        headers = headers.set('Authorization', login);
        return this.httpClient.get(this.authApi, { headers: headers });
    }

    public getCode(token: string, langage: string) {
        let headers = new HttpHeaders();
        headers = headers.set('x-access-token', token);
        return this.httpClient.post(this.enigmaApi, langage, { headers: headers });
    }


}