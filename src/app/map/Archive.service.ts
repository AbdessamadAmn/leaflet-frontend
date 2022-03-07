import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Archive } from "./Archive";

@Injectable({
    providedIn: 'root'
})
export class ArchiveService{

    baseUrl = 'http://localhost:8080/device';
    constructor(private http: HttpClient){}

    public getpaths(): Observable<Archive[]>{
        var id = 429911;
        return this.http.get<Archive[]>(this.baseUrl+'/paths/'+id);
    }
}