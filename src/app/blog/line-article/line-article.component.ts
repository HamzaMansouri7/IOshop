import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-article',
  templateUrl: './line-article.component.html',
  styleUrls: ['./line-article.component.css']
})
export class LineArticleComponent implements OnInit {
@Input() date:string
@Input() author:string
  constructor() { }

  ngOnInit(): void {
  }

}