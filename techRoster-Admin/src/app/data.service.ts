import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JSONData, Technology, Course, TechnologyCourse} from "./data.model";

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
    // has the data loaded?
    public loaded:boolean = false;

    private courseObject:Course;
    private techObject:Technology;
    private techCourseObject:TechnologyCourse;

    // course properties
    public courseId:string;
    public courseCode:string;
    public courseName:string;

    // technology properties
    public techId:string;
    public techName:string;
    public techDescription:string;
    public techDifficulty:number;
    public techCourses:TechnologyCourse[];


    // injecting Http service into PortfolioDataService
    constructor(myHttp:HttpClient){
        this.http = myHttp;
        this.techCourses = [];
    }

    // ------------------------------------ public methods
    public load():void {
        //console.log("loading data!");
        this.http.get<JSONData>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                // success :)
                // console.log("RECEIVED: " + JSON.stringify(data));

                // isolate the technologies array in the received JSON
                this.technologies = data.technologies;
                this.courses = data.courses;
                // console.log("Tech Name: " + this.technologies[0].name);
                // console.log("Course Name: " + this.courses[0].name);
                this.loaded = true;

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

        this.loaded = false; 
        this.http.post<Course>(this.postCourseScript, this.courseObject).subscribe(
            data => {
                console.log("POST is successful")
                               
                this.resetValues();
                this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        );
    }

    public deleteTech(id:string, name:string):void {
        this.techId = id;
        this.techName = name;
    }

    public deleteTechSubmit(id:string):void {
        console.log("id in deleteTechSubmit: " + id);
        
        this.loaded = false;
        this.http.delete((this.deleteTechScript + "/" + id)).subscribe(
            data => {
                console.log("Delete is successful")                               
                this.resetValues();
                this.load()
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        );


    }

    public deleteCourse(id:string, code:string, name:string):void {
        this.courseId = id;
        this.courseCode = code;
        this.courseName = name;
    }

    public deleteCourseSubmit(id:string, code:string):void {
        console.log("id in deleteCourseSubmit: " + id);

        this.loaded = false;
        this.http.delete((this.deleteCourseScript + "/" + id + "/" + code)).subscribe(
            data => {
                console.log("Delete is successful")                               
                this.resetValues();
                this.load()
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        );    
    }

    public populateCourseEdit(id:string, code:string, name:string):void {
        this.courseId = id;
        this.courseCode = code;
        this.courseName = name;
    }

    public updateCourse(id: string):void {
        this.courseObject = {
            "_id": id,
           "code": this.courseCode,
           "name": this.courseName
       }

        this.loaded = false;                
        this.http.put((this.putCourseScript + "/" + id), this.courseObject).subscribe(
            data => {
                console.log("Update is successful")
                this.resetValues();
                this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        )
    }

    public coursesClicked(code, name, event:any):void {
        this.techCourseObject = {
            "code": code,
            "name": name
        }
        if (event.target.checked) {
            this.techCourses.push(this.techCourseObject);
        }
        else {
            //find the course in the techCourses array and remove it
            this.techCourses.forEach( (item, index) => {
              if(item === this.techCourseObject) this.techCourses.splice(index,1);
            });
        }
        console.log("tech courses: ", this.techCourses);

    }

    public addTech():void {
        this.techObject = {
            "_id": null,
           "name": this.techName,
           "description": this.techDescription,
           "difficulty": this.techDifficulty,
           "courses": this.techCourses
       }

       this.loaded = false; 
       this.http.post<Technology>(this.postTechScript, this.techObject).subscribe(
           data => {
               console.log("POST is successful")
                              
               this.resetValues();
               this.load();
           },
           error => {
               console.log("Error", error);
               this.loaded = true;
           }
       );
    }

    // ------------------------------------ private methods

    private resetValues():void {
        this.courseId = null;
        this.courseCode = "";
        this.courseName = "";
        this.techId = null;
        this.techName = "";
        this.techDescription = "";
        this.techDifficulty = 1;        
        this.techCourses = [];
    }
}