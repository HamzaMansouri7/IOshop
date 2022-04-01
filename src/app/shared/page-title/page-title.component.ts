import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingForm } from '../shared'

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  url:string
  routForm= new RoutingForm()
  routings=[]
  constructor(private router : Router) {}

  ngOnInit(): void {
    this.url = this.router.url;
    let tabRoutes=this.url.split("/");
     tabRoutes.shift();
     for (let i = 0; i < tabRoutes.length; i++) {
      this.routForm.nameRoute=tabRoutes[i]
      this.routForm.path="/"+tabRoutes[i]
      var verif = parseInt(tabRoutes[i]);
        if(isNaN(verif)){
          this.routings.push(this.routForm)
        }
      this.routForm=new RoutingForm()
     }
  }
}