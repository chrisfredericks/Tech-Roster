import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-edit-tech',
  templateUrl: './edit-tech.component.html',
  styleUrls: ['./edit-tech.component.scss']
})
export class EditTechComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
