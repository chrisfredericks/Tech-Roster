import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JSON, Technology} from "./data.model";

// all services need this decorator function
@Injectable()
export class DataService {
    // request url of Web API to get/put/delete/post JSON
    private courseScript:string = "http://localhost:8080/course";
    // the http service to be injected
    private http:HttpClient;
    // array of Json data
    public technologies:Technology[];

    // injecting Http service into PortfolioDataService
    constructor(myHttp:HttpClient){
        this.http = myHttp;
    }

    

    
}