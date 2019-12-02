import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-delete-tech',
  templateUrl: './delete-tech.component.html',
  styleUrls: ['./delete-tech.component.scss']
})
export class DeleteTechComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
