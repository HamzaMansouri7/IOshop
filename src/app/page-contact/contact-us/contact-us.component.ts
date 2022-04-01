import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Email } from 'src/app/shared/email';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactObject:Email=new Email();
  mail: { from: any; to: string; subject: string; content: any; };
  showAlert: boolean;
  contactForm: any;
  constructor(private sharedMail:SharedService,private formBuilder: FormBuilder,@Inject(DOCUMENT) private document: Document) {

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
      tel: ['', [Validators.required]],
      msg: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  sendMail(){
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    if(form.checkValidity() === true){
      this.contactObject=this.contactForm.value
      this.mail = {
        "from": this.contactObject.email  ,
        "to": environment.emailSociete ,
        "subject": "Contact Herbabio",
        "content": this.contactObject.msg
      }
      this.sharedMail.sendMail(this.mail).subscribe(
        data=>{
            this.showAlert=true;
            this.contactForm.reset();
            setTimeout(() => {
              this.showAlert=false
            }, 3000);
        }
      )
    }

  }
}