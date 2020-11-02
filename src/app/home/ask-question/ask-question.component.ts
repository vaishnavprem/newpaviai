import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  constructor(   public router: Router) { }

  ngOnInit(): void {
  }
  openFindJOb(){
    this.router.navigate(['/jobs/search-job']);

  }
}
