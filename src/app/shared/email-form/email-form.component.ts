import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../email';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
model:Email=new Email();
mail: { from: any; to: string; subject: string; content: any; };
showAlert: boolean;
  constructor(private sharedMail:SharedService) { }

  ngOnInit(): void {
  }
  sendMail(){
    this.mail = {
      "from": this.model.email ,
      "to":  environment.emailSociete,
      "subject": "Contact Herbabio",
      "content": this.model.msg
    }
    this.sharedMail.sendMail(this.mail).subscribe(
      data=>{
          this.showAlert=true;
       
      }
    )

  }
}