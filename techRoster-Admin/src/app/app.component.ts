import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ DataService ]
})
export class AppComponent implements OnInit {
  // inject the Data service into this root component
  constructor(public data:DataService) {}

  public ngOnInit():void {
    this.data.load();
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

// }
