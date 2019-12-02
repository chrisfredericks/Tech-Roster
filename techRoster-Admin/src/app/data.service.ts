import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JSONData, Technology, Course} from "./data.model";

// all services need this decorator function
@Injectable()
export class DataService {
    // request url of Web API to get/put/delete/post JSON
    private RETRIEVE_SCRIPT:string = "http://localhost:8080/get";
    private postCourseScript:string = "http://localhost:8080/postCourse";
    private postTechScript:string = "http://localhost:8080/postTech";
    private putCourseScript:string = "http://localhost:8080/putCourse";
    private putTechScript:string = "http://localhost:8080/putTech";
    private deleteCourseScript:string = "http://localhost:8080/deleteCourse";
    private deleteTechScript:string = "http://localhost:8080/deleteTech";
    // the http service to be injected
    private http:HttpClient;
    // array of Json data
    public technologies:Technology[];
    public courses:Course[];

    private courseObject:Course;

    // course properties
    public courseCode:string;
    public courseName:string;

    // injecting Http service into PortfolioDataService
    constructor(myHttp:HttpClient){
        this.http = myHttp;
    }

    // ------------------------------------ public methods
    public load():void {
        //console.log("loading data!");
        this.http.get<JSONData>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                // success :)
                console.log("RECEIVED: " + JSON.stringify(data));

                // isolate the technologies array in the received JSON
                this.technologies = data.technologies;
                this.courses = data.courses;
                console.log("Tech Name: " + this.technologies[0].name);
                console.log("Course Name: " + this.courses[0].name);

            },
            err => {
                console.log("Error retrieving portfolio data :(");
            }
        );
    } 
    
    public addCourse():void {
        this.courseObject = {
             "_id": null,
            "code": this.courseCode,
            "name": this.courseName
        }

        this.http.post(this.postCourseScript, this.courseObject).subscribe(
            data => {
                console.log("POST is successful")
                this.load()
            },
            error => {
                console.log("Error", error);
            }
        );

    }

    
}