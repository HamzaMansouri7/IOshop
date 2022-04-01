import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { Login, signUp } from '../auth';
import { AuthService } from '../auth.service';
import { CustomerService } from '../../order/order-parts/customer.service';
import { Address, Contact, Customer, User } from 'src/app/order/order-parts/customer';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  loginForm: any
  contactForm :any
  resetForm:any
  customerAdress:any
  alertError: boolean=false;
  msgAlert: string;
  usedMail:boolean
  newAccount:boolean=false
  userObject :User = new User()
  loginObject: Login = new Login()
  signUpObject: signUp=new signUp()
  customerObject:Customer = new Customer()
  adressObject = new Address()
  contactObject = new Contact()
  mailForm: { from: any; to: string; subject: string; content: any; };
  alertSuccess:boolean
  pwdForgot:boolean=false
  resetMail:string
  link:string
  linkSent: boolean;
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router: Router,private sharedService:SharedService,
    private customerService:CustomerService,@Inject(DOCUMENT) private document: Document) {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
    });


    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
      password: ['', [Validators.required]],
    });

    this.customerAdress = this.formBuilder.group({
      street: ['', [Validators.required]],
      geoCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });


    this.resetForm = this.formBuilder.group({
      resetMail: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
    });
   }

   

  ngOnInit(): void {

  }

  loginChange(value){
    this.alertError=false
  }

  login() {
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    this.authService.login(this.loginForm.value).subscribe(
      token => {
        if (token.role == "webCustomer") {
          var now = new Date();
          var time = now.getTime();
          var expireTime = time + 24000 * 3600;
          now.setTime(expireTime);
          this.document.cookie = "userId=" + Object.values(token)[0] + "; expires=" + now + ";path=/";
          this.document.cookie = "token=" + Object.values(token)[1] + "; expires=" + now + ";path=/";
          this.document.cookie = "role=" + Object.values(token)[2] + "; expires=" + now + ";path=/";
          this.alertError = false
          this.router.navigate(['/']);
        }else{
          this.alertError=true
          this.msgAlert = "Email et/ou mot de passe incorrect"
        }
      },
      err => {
        this.alertError = true
        this.msgAlert = "Email et/ou mot de passe incorrect"
      }
    )
  }

  signup(){
    this.linkSent=false
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false || this.usedMail) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    if (form.checkValidity() === true &&  !this.usedMail) {
    let adrArray = []
    let contactArray = []
    adrArray.push(this.customerAdress.value)
    contactArray.push(this.contactForm.value)
    this.customerObject.name=this.contactForm.value.name
    this.customerObject.adress = adrArray
    this.customerObject.adress[0].number = null
    this.customerObject.customerTypeId = 1
    this.customerObject.contacts = contactArray
    this.customerObject.name=this.contactObject.firstName
    this.customerService.addCustomer(this.customerObject).subscribe(
      customer => {
        if (customer) {
          this.userObject.email = this.contactForm.value.email
          this.userObject.password = this.contactForm.value.password
          this.userObject.customerId = customer
          this.userObject.role = "webCustomer"
          this.userObject.name = customer.name
          this.userObject.contactId=customer.contacts[0]
          this.customerService.addUser(this.userObject).subscribe(
            user => {
              if (user) {
                this.sendWelcomeMail()
                this.alertSuccess=true
                this.msgAlert="Nous vous remercions de votre enregistrement et vous souhaitons la bienvenue sur Herbabio.tn  ! vos coordonnées seront envoyées à votre boîte mail " + this.contactObject.email + ""
                this.alertError=false
                setTimeout(() => {
                  this.newAccount=false
                  this.loginObject.email=this.contactObject.email
                  this.loginObject.password=this.signUpObject.password
                  this.alertSuccess=false
                }, 6000);
              }
            }
          )
        }
      }
    )
    }
  }



  valuechange(value) {
    let filter: FilterDto = new FilterDto()
    filter.where = { active: true }
    this.customerService.getContacts(filter).subscribe(
      data => {
             this.usedMail=this.sharedService.verifMailValidity(value,data[0])
        }
      )
  }

  sendWelcomeMail() {
    let welcomeContent = '<div class="text-center" style=‘width:650px;font-family:Open-sans,sans-serif;color:#f6f6f6;font-size:13px;line-height:18px;margin:auto;’><table style=‘width:100%;margin-top:10px’><tbody><tr><td style=‘width:20px;padding:7px 0’>&nbsp;</td><td align=‘center’ style=‘padding:7px 0’><table  style=width:100%’><tbody><tr><td align=‘center’ style="border-bottom:4px ; solid :#333333;padding:7px 0 ;"><a title="Herbabio" , href="https://www.demo-shop-ioc.tn/" ; style=‘color:#337ff1’ target=‘_blank’ ><img src="https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1628601138/herbabio_bdaxcf.png" style="margin-left: 25% ;" alt=‘Herbabio’ data-image-whitelisted=‘‘ class=‘CToWUd’></a></td>	</tr><tr><td align=‘center’ style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><span style=‘font-weight:500;font-size:28px;text-transform:uppercase;line-height:33px’> Bonjour ' + this.contactForm.value.name + ',</span><br><span style=‘font-weight:500;font-size:16px;text-transform:uppercase;line-height:25px’>Merci d' + "'" + 'avoir créer votre compte client sur Herbabio.</span></font>	</td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border:1px solid #d6d4d4;background-color:#f6f6f6;padding:7px 0’><table style=‘width:100%’>	<tbody><tr>	<td width=‘10’ style=‘padding:7px 0’>&nbsp;</td><td style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><p style=‘border-bottom:1px solid #d6d4d4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px’>Vos codes daccès sur Herbabio.</p><span style=‘color:#777’>Vos codes daccès :<br> <span style=‘color:#333’><strong>Adresse e-mail : <a href=‘mailto:' + this.contactForm.email + ' style=‘color:#337ff1’ target=‘_blank’>' + this.contactForm.value.email + '</a></strong></span><br><span style=‘color:#333’><strong>Mot de passe :</strong></span>' + this.contactForm.password + '</span></font>	</td><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td></tr></tbody></table>	</td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border:1px solid #d6d4d4;background-color:#f6f6f6;padding:7px 0’><table style=‘width:100%’><tbody><tr><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td><td style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><p style=‘border-bottom:1px solid #d6d4d4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px’>Conseils de sécurité importants :</p><ol style=‘margin-bottom:0’><li>Vos informations de compte doivent rester confidentielles.</li><li>Ne les communiquez jamais à qui que ce soit.</li><li>Changez votre mot de passe régulièrement.</li><li>Si vous pensez que quelqu un utilise votre compte illégalement, veuillez nous prévenir immédiatement.</li></ol></font></td><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td></tr></tbody></table></td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style="padding:7px 0;"><font size=‘2’ face=‘Open-sans, sans-serif’; color=‘#555454’><span>Vous pouvez dès à présent passer commande sur notre boutique : <a href=‘https://www.demo-shop.ioc.tn’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.demo-shop.ioc.tn’>Herbabio</a></span></font></td></tr>	<tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border-top:4px solid #333333;padding:7px 0’><span style="color:black;"><a href=‘https://www.demo-shop-ioc.tn/’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.demo-shop-ioc-tn’>Herbabio</a> réalisé avec <a href=‘https://www.iotech.tn/’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.iotech.tn/’>Iotech™</a></span></td></tr></tbody></table></td><td style=‘width:20px;padding:7px 0’>&nbsp;</td></tr></tbody></table><div class=‘yj6qo’></div><div class=‘adL’></div></div>'

      this.mailForm = {
        "from": environment.emailSociete,
        "to": this.contactForm.value.email,
        "subject": "Bienvenu "+ this.contactObject.firstName +" chez Herbabio",
        "content": welcomeContent
      }
      this.authService.sendMail(this.mailForm).subscribe(
        data => {

        }
      )
  }

  sendPwdLink(){
    let filter: FilterDto = new FilterDto()
    filter.relations = ["contactId"]
    filter.where={email:this.resetMail}
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    if(form.checkValidity() === true){
    this.customerService.getAllUsers(filter).subscribe(
      user => {
        if(user[0][0]){
                  this.userObject=user[0][0]
        this.link = user[0][0].resToken
        this.sendResetMail()
        }else{
          this.alertError=true
          this.msgAlert='Aucun compte trouvé avec cet email'
        }
      }
    )
    }

  }
  sendResetMail(){
    let resetContent = '<div class="text-center" style=‘width:650px;font-family:Open-sans,sans-serif;font-size:13px;line-height:18px;margin:auto;’><table style=‘width:100%;margin-top:10px’><tbody><tr><td style=‘width:20px;padding:7px 0’>&nbsp;</td><td align=‘center’ style=‘padding:7px 0’><table  style=width:100%’><tbody><tr><td align=‘center’ style="border-bottom:4px ; solid :#333333;padding:7px 0 ;"><a title="Herbabio" , href="https://herbabio.tn/" ;  target=‘_blank’ ><img src="https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1628601138/herbabio_bdaxcf.png" style="margin-left: 50% ; padding-bottom:100px;" alt=‘Herbabio’ data-image-whitelisted=‘‘ class=‘CToWUd’></a></td>	</tr><tr><td align=‘center’ style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’><span style=‘font-weight:500;font-size:28px;text-transform:uppercase;line-height:33px’> Bonjour '+ this.userObject.name +' </span><br><span style=‘font-weight:500;font-size:16px;line-height:25px’><p>Nous avons reçu une demande de changement de mot de passe pour votre compte. <br> Si vous avez demandé ce changement, définir un nouveau mot de passe ici :</p></span></font>	</td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border:1px solid #d6d4d4;padding:7px 0’><table style=‘width:100%’>	<tbody><tr>	<td width=‘10’ style=‘padding:7px 0’>&nbsp;</td><td style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’><p style=‘border-bottom:1px solid #d6d4d4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px’></p><a href=https://www.herbabio.tn/login/reset-password?token=' + this.link + 'id'+ this.userObject.id +'><button style="border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color:#7ba829;"> Définir un nouveau mot de passe </button> </a> <br><br><br><p style="font-size:18px;">Si vous n'+"'"+'avez pas fait cette demande, vous pouvez ignorer cet e-mail et votre mot de passe restera le même. <br><br> Merci, <b style="color:#5a3715;"> Herbabio <b>! </p>'
    this.mailForm = {
      "from": environment.emailSociete,
      "to": this.resetMail,
      "subject": "Réinitialisation de mot de passe Herbabio",
      "content": resetContent
    }
    this.authService.sendMail(this.mailForm).subscribe(
      data => {
        this.linkSent=true
        this.msgAlert='S'+"'"+'il y a un compte associé à '  + this.resetMail +'  vous recevrez un email avec un lien pour réinitialiser votre mot de passe.'
        this.alertSuccess=false
        this.alertError=false
        setTimeout(() => {
          this.router.navigate(['/login']);

        }, 5000);
      }
    )
  }
}
