import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Course } from '../data.model';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.scss']
})
export class AddTechComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
