import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authApi = "http://localhost:8004/auth/login";
    private enigmaApi = "http://localhost:8008/enigma/getCode"
    private allowedOrigin: string[] = ["http://localhost:4200/", "http://localhost:8008", "http://localhost:8004/auth/login"];

    constructor(private httpClient: HttpClient) { }

    public login(login: string) {
        const headers = new HttpHeaders({ 'Authorization': login, 'Access-Control-Allow-Origin': this.allowedOrigin, 'Access-Control-Allow-Methods': 'GET,POST' });

        console.log("loginEncoded:", login)
        return this.httpClient.get(this.authApi, { headers: headers });
    }

    public getCode(token: string, langage: string) {
        console.log("TCL: AuthService -> getCode -> token", token)

        const headers = new HttpHeaders({ 'x-access-token': token, 'Access-Control-Allow-Origin': this.allowedOrigin, 'Access-Control-Allow-Methods': 'GET,POST' });

        console.log("TCL: AuthService -> getCode -> headers", headers)
        return this.httpClient.post(this.enigmaApi, langage, { headers: headers });
    }


}