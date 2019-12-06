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
    // arrays of Json data
    public technologies:Technology[];
    public courses:Course[];
    // has the data loaded?
    public loaded:boolean = false;

    // data objects
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
                // isolate the technologies array in the received JSON
                this.technologies = data.technologies;
                // isolate the courses array in the received JSON
                this.courses = data.courses;
                this.loaded = true;
            },
            err => {
                console.log("Error retrieving data :(");
            }
        );
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
                console.log("Add Technology is successful")
                              
               this.resetValues();
               this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        )
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
                console.log("Add Course is successful")
                               
                this.resetValues();
                this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        )
    }

    public deleteTech(id:string, name:string):void {
        this.techId = id;
        this.techName = name;
    }

    public deleteTechSubmit(id:string):void {
        this.loaded = false;
        this.http.delete((this.deleteTechScript + "/" + id)).subscribe(
            data => {
                console.log("Delete Technology is successful")                               
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
        this.loaded = false;
        this.http.delete((this.deleteCourseScript + "/" + id + "/" + code)).subscribe(
            data => {
                console.log("Delete Course is successful")                               
                this.resetValues();
                this.load()
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        );    
    }

    public populateTechEdit(tech: Technology):void {
        this.techId = tech._id;
        this.techName = tech.name;
        this.techDescription = tech.description;
        this.techDifficulty = tech.difficulty; 
        this.techCourses = tech.courses;
    }

    public updateTech(id: string):void {
        this.techObject = {
            "_id": id,
           "name": this.techName,
           "description": this.techDescription,
           "difficulty": this.techDifficulty,
           "courses": this.techCourses
        }
        this.loaded = false;                
        this.http.put((this.putTechScript + "/" + id), this.techObject).subscribe(
            data => {
                console.log("Update Technology is successful")
                this.resetValues();
                this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        )
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
                console.log("Update Course is successful")
                this.resetValues();
                this.load();
            },
            error => {
                console.log("Error", error);
                this.loaded = true;
            }
        )
    }

    public coursesClicked(code: string, name: string):void {
        this.techCourseObject = {
            "code": code,
            "name": name
        }
        // determine the index number of the course in the array
        let indexNumber:number; 
        this.techCourses.find((course, index) => {
            if (course.code == code) {
                indexNumber = index;
                return true;
            } else {
                return false;
            }
        });

        if (this.techCourses.find(c => c.code == code)) {
            // remove from array if already there
            this.techCourses.splice(indexNumber, 1);
        } else {
            // add to array if not already there
            this.techCourses.push(this.techCourseObject);
        }
        console.log(this.techCourses);
    }
    
    // determine if course is in the technology collection
    public isChecked(id: string, code: string):boolean {
        let count = 0;
        let newArray:Technology[] = this.technologies.filter(function(tech) {
            return tech._id == id;
        });        
        newArray[0].courses.forEach((course) => {            
            if (course.code == code) {count++;}
        });
        if (count > 0) {
            return true;
        } else {
            return false;
        } 
    }
        
    // ------------------------------------ private methods
        
    private resetValues():void {
        this.courseId = null;
        this.courseCode = "";
        this.courseName = "";
        this.courseObject = {
            "_id": null,
            "name": "",
            "code": ""
        };
        this.techId = null;
        this.techName = "";
        this.techDescription = "";
        this.techDifficulty = 1;        
        this.techCourses = [];
        this.techObject = {
            "_id": null,
            "name": "",
            "description": "",
            "difficulty": 1,
            "courses": []
        };
    }
}