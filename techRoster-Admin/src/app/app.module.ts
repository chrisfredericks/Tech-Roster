import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddTechComponent } from './add-tech/add-tech.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { DeleteTechComponent } from './delete-tech/delete-tech.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditTechComponent } from './edit-tech/edit-tech.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddCourseComponent,
    AddTechComponent,
    DeleteCourseComponent,
    DeleteTechComponent,
    EditCourseComponent,
    EditTechComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path:"main", component: MainComponent},
      { path: "addcourse", component: AddCourseComponent },
      { path: "addtech", component: AddTechComponent },
      { path: "deletecourse", component: DeleteCourseComponent },
      { path: "deletetech", component: DeleteTechComponent },
      { path: "editcourse", component: EditCourseComponent },
      { path: "edittech", component: EditTechComponent },
      { path: "", redirectTo: "main", pathMatch: "full"},
      { path: "**", redirectTo: "main", pathMatch: "full"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
