import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Order, OrderDetail, RulesAgreement } from '../order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { FilterDto } from 'src/app/filter.dto';
import { CustomerService } from '../order-parts/customer.service';
import { Address, Contact, Customer, User } from '../order-parts/customer';
import { CartService } from '../../shared/cart.service';
import { AuthService } from '../../auth/auth.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { DOCUMENT } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  tabActive: string = "ngb-panel-0"
  productArray = []
  totalAmount: number = 0
  customerObject = new Customer()
  adressObject = new Address()
  contactObject = new Contact()
  orderObject = new Order()
  rulesObject: RulesAgreement = new RulesAgreement()
  orderDetails: OrderDetail[] = []
  customerAdress: any;
  customerForm: any;
  deliveryForm: any;
  PaiementForm: any;
  deliveryError: boolean;
  paiemntError: boolean;
  agreementError: boolean;
  allFormValid: boolean;
  alertSuccess: boolean;
  itemNumber: number = 0
  alertError: boolean = false;
  mailSent: boolean = false
  addedOrder: Order
  isLogin: boolean
  loginForm: any
  orderMail: { from: any; to: string; subject: string; content: any; };
  welcomeMail: { from: any; to: string; subject: string; content: any; };
  isLoggedIn: boolean = false
  loginmail: string;
  loginpassword: string
  allContact = []
  usedMail: boolean = false;
  userObject: User = new User()
  msgAlert: string
  delivelryDisabled: boolean = true
  paiementDisabled: boolean = true

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private router: Router, @Inject(DOCUMENT) private document: Document, private sharedService: SharedService,
    private customerService: CustomerService, private cartservice: CartService, private authService: AuthService, private GlobalObjectServiceService: GlobalObjectServiceService) {
    this.orderObject.orderDetails = []
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
      tel: ['', [Validators.required, Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      receveOffer: ['', [Validators.required]],
      confidentiality: ['', [Validators.required]],
      insecription: ['', [Validators.required]],
      termsAgreement: ['', [Validators.required]],
    });
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
    });
    this.customerAdress = this.formBuilder.group({
      number: ['', []],
      street: ['', [Validators.required]],
      geoCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
    this.deliveryForm = this.formBuilder.group({
      forDeliver: ['', [Validators.required]],
      description: [''],
    });
    this.PaiementForm = this.formBuilder.group({
      deliveryPaiement: ['', [Validators.required]],
      paiementAgreement: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    let token = this.sharedService.getCookie("token")
    if (token) {
      this.isLoggedIn = true
      this.tabActive = "ngb-panel-1"
      this.getCustomer()
      this.isLogin = true
    }

    this.productArray = this.cartservice.getProductCart()
    if (this.productArray.length < 1) {
      let cookie: any
      cookie = this.sharedService.getAllCookies()
      Object.entries(cookie).forEach(([key, val]) => {
        var element = JSON.stringify(val);
        if (element.length > 2) {
          var parsed = JSON.parse(JSON.parse(element));
          this.productArray.push(parsed)
        }
      }
      );
    }
    this.productArray.forEach(async element => {
      let orderDetailForm = new OrderDetail();
      orderDetailForm.productId = element
      orderDetailForm.price = element.productPrices[0].price
      orderDetailForm.quantity = element.quantity
      await this.orderDetails.push(orderDetailForm);
    });
    this.orderObject.orderDetails = this.orderDetails;
    this.orderDetails = []
    this.TotalAmount()
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }

  TotalAmount() {
    this.productArray.forEach(element => {
      this.totalAmount = this.totalAmount + (element.productPrices[0].price * element.quantity)
    });

  }

  login(tab) {
    this.authService.login(this.loginForm.value).subscribe(
      token => {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 24000 * 3600;
        now.setTime(expireTime);
        this.document.cookie = "userId=" + Object.values(token)[0] + "; expires=" + now + ";path=/";
        this.document.cookie = "token=" + Object.values(token)[1] + "; expires=" + now + ";path=/";
        this.document.cookie = "role=" + Object.values(token)[2] + "; expires=" + now + ";path=/";
        if (token.role == "webCustomer") {
          this.alertError = false
          this.tabActive = tab
          this.getCustomer();
        }
      },
      err => {
        this.alertError = true
        this.msgAlert = "Email et/ou mot de passe incorrect"
        var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        form.checkValidity() === false
        event.preventDefault();
        event.stopPropagation();
        this.loginForm.reset();
      }
    )
  }

  paiementchange(e) {
    this.paiemntError = false
  }

  agrementChange(e) {
    this.agreementError = false
  }


  nextTab(tab: string) {
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false || this.usedMail) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    if (form.checkValidity() === true && tab == "ngb-panel-1") {
      this.usedMail = false
      if (!this.isLogin) {
        this.tabActive = tab
      } else {
        this.login(tab)
      }
    }
    if (form.checkValidity() === true && tab == "ngb-panel-2" && !this.usedMail) {
      this.tabActive = tab
      this.delivelryDisabled = false

    }
    if (this.deliveryForm.value.forDeliver == '' && tab == 'ngb-panel-3') {
      this.deliveryError = true
    } else if (this.deliveryForm.value.forDeliver.length > 1 && tab == 'ngb-panel-3') {
      this.tabActive = 'ngb-panel-4'
      this.paiementDisabled = false
    }
  }


  FormValidation(tab: string) {
    if (this.PaiementForm.value.deliveryPaiement == undefined && tab == 'ngb-panel-4') {
      this.paiemntError = true
    }
    if (this.PaiementForm.value.paiementAgreement == undefined && tab == 'ngb-panel-4') {
      this.agreementError = true
    }
    else if (this.PaiementForm.value.deliveryPaiement && this.PaiementForm.value.paiementAgreement && tab == 'ngb-panel-4') {
      this.allFormValid = true
    }

    else if (!this.PaiementForm.value.deliveryPaiement && !this.isLoggedIn) {
      this.allFormValid = false
      this.paiemntError = true
      this.msgAlert = "L'ajout de commande a été échoué .. verifier le formulaire"
    } else if (!this.PaiementForm.value.paiementAgreement) {
      this.agreementError = true
    }
  }

  verifMailValidity() {
    let filter: FilterDto = new FilterDto()
    filter.where = { active: true }
    this.customerService.getContacts(filter).subscribe(
      data => {
        this.allContact = data[0]
        const existsInBd = this.allContact.filter(element => element.email === this.customerForm.value.email && this.customerForm.value.email != undefined)
        if (existsInBd.length > 0) {
          this.usedMail = true
        } else {
          this.usedMail = false
        }
      }
    )
  }


  addAction(tab: string) {
    this.FormValidation(tab)
    if (this.allFormValid) {
      var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      if (form.checkValidity() === true && !this.usedMail && !this.isLogin) {
        let adrArray = []
        let contactArray = []
        adrArray.push(this.customerAdress.value)
        contactArray.push(this.customerForm.value)
        this.customerObject.adress = adrArray
        this.customerObject.adress[0].number = null
        this.customerObject.contacts = contactArray
        this.customerObject.customerTypeId = 1
        this.customerService.addCustomer(this.customerObject).subscribe(
          customer => {
            if (customer) {
              this.userObject.email = this.customerForm.value.email
              this.userObject.password = this.customerForm.value.password
              this.userObject.customerId = customer
              this.userObject.role = "webCustomer"
              this.userObject.name = customer.name
              this.customerService.addUser(this.userObject).subscribe(
                user => {
                  if (user) {
                    this.orderObject.customerId = customer
                    this.orderObject.customerId.adress = this.customerAdress.value
                    this.orderObject.customerId.contacts = this.customerForm.value
                    this.orderObject.totalPrice = this.totalAmount
                    this.orderObject.description = this.deliveryForm.value.description
                    this.postOrder(this.orderObject)
                  }
                }
              )
            }
          }
        )
      }
      if (this.isLogin && form.checkValidity() === true) {
        this.postOrder(this.orderObject)
      }
      else {
        this.alertError = true
        this.msgAlert = "L'ajout de commande a été échoué .. verifier le formulaire"
        this.alertSuccess = false
        this.tabActive = 'ngb-panel-0'
      }
    }
  }


  deleteCookie() {
    this.cartservice.deleteAllprodCart(this.productArray)
    this.tabActive = 'ngb-panel-0'
  }

  valuechange(value) {
    this.verifMailValidity()
  }

  postOrder(orderObject) {
    this.orderObject.description = this.deliveryForm.value.description
    if (this.deliveryForm.value.forDeliver == 'true' && orderObject.totalPrice < 60) {
      orderObject.deliveryPrice = 7
      orderObject.totalPrice = orderObject.totalPrice + 7
    }
    orderObject.totalPrice = orderObject.totalPrice + 0.6
    this.orderService.postOrder(orderObject).subscribe(
      order => {
        this.addedOrder = order
        this.alertSuccess = true
        this.alertError = false
        this.GlobalObjectServiceService.getWindow().scroll(0, 0);
        this.sendMail();
        this.deleteCookie();
        setTimeout(() => {
          this.router.navigate(['/product-list']);
          var event = new CustomEvent('updateCartItem', { 'detail': true });
          this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
        }, 6000);
      }
    )
  }
  getCustomer() {
    let customerId = +this.sharedService.getCookie("userId")
    let filter: FilterDto = new FilterDto()
    filter.where = { id: customerId }
    filter.relations = ["customerId", "customerId.adress", "customerId.contacts"]
    this.customerService.getUser(filter).subscribe(
      user => {
        this.adressObject = user[0][0].customerId.adress[0]
        this.orderObject.customerId = user[0][0].customerId
        this.orderObject.totalPrice = this.totalAmount
        this.orderObject.description = this.deliveryForm.value.description
        this.customerObject = user[0][0].customerId
        this.contactObject = this.customerObject.contacts[0]
        this.contactObject.email = user[0][0].email
        this.contactObject.firstName = user[0][0].name
      }
    )
  }

  sendMail() {
    let deliveryMode:string
    let paiementMode:string
    if(this.deliveryForm.value.forDeliver == 'true'){
        deliveryMode='Livraison Aramex'
        paiementMode=' Paiement à la livraison'
    }else{
        deliveryMode='Retrait en magasin'
        paiementMode=' Paiement en Magasin'
    }
    
    let welcomeContent = '<div class="text-center" style=‘background-color:#f6f6f6;width:650px;font-family:Open-sans,sans-serif;color:#f6f6f6;font-size:13px;line-height:18px;margin:auto;’><table style=‘width:100%;margin-top:10px’><tbody><tr><td style=‘width:20px;padding:7px 0’>&nbsp;</td><td align=‘center’ style=‘padding:7px 0’><table bgcolor=#f6f6f6 style=width:100%’><tbody><tr><td align=‘center’ style="border-bottom:4px ; solid :#333333;padding:7px 0 ;"><a title="Herbabio" , href="https://www.demo-shop-ioc.tn/" ; style=‘color:#337ff1’ target=‘_blank’ ><img src="https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1628601138/herbabio_bdaxcf.png" style="margin-left: 25% ;" alt=‘Herbabio’ data-image-whitelisted=‘‘ class=‘CToWUd’></a></td>	</tr><tr><td align=‘center’ style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><span style=‘font-weight:500;font-size:28px;text-transform:uppercase;line-height:33px’> Bonjour ' + this.customerForm.value.name + ',</span><br><span style=‘font-weight:500;font-size:16px;text-transform:uppercase;line-height:25px’>Merci d' + "'" + 'avoir créer votre compte client sur Herbabio.</span></font>	</td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border:1px solid #d6d4d4;background-color:#f6f6f6;padding:7px 0’><table style=‘width:100%’>	<tbody><tr>	<td width=‘10’ style=‘padding:7px 0’>&nbsp;</td><td style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><p style=‘border-bottom:1px solid #d6d4d4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px’>Vos codes daccès sur Herbabio.</p><span style=‘color:#777’>Vos codes daccès :<br> <span style=‘color:#333’><strong>Adresse e-mail : <a href=‘mailto:' + this.contactObject.email + ' style=‘color:#337ff1’ target=‘_blank’>' + this.contactObject.email + '</a></strong></span><br><span style=‘color:#333’><strong>Mot de passe :</strong></span>' + this.customerObject.password + '</span></font>	</td><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td></tr></tbody></table>	</td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border:1px solid #d6d4d4;background-color:#f6f6f6;padding:7px 0’><table style=‘width:100%’><tbody><tr><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td><td style=‘padding:7px 0’><font size=‘2’ face=‘Open-sans, sans-serif’ color=‘#555454’><p style=‘border-bottom:1px solid #d6d4d4;margin:3px 0 7px;text-transform:uppercase;font-weight:500;font-size:18px;padding-bottom:10px’>Conseils de sécurité importants :</p><ol style=‘margin-bottom:0’><li>Vos informations de compte doivent rester confidentielles.</li><li>Ne les communiquez jamais à qui que ce soit.</li><li>Changez votre mot de passe régulièrement.</li><li>Si vous pensez que quelqu un utilise votre compte illégalement, veuillez nous prévenir immédiatement.</li></ol></font></td><td width=‘10’ style=‘padding:7px 0’>&nbsp;</td></tr></tbody></table></td></tr><tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style="padding:7px 0;"><font size=‘2’ face=‘Open-sans, sans-serif’; color=‘#555454’><span>Vous pouvez dès à présent passer commande sur notre boutique : <a href=‘https://www.demo-shop.ioc.tn’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.demo-shop.ioc.tn’>Herbabio</a></span></font></td></tr>	<tr><td style=‘padding:0!important’>&nbsp;</td></tr><tr><td style=‘border-top:4px solid #333333;padding:7px 0’><span style="color:black;"><a href=‘https://www.demo-shop-ioc.tn/’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.demo-shop-ioc-tn’>Herbabio</a> réalisé avec <a href=‘https://www.iotech.tn/’ style=‘color:#337ff1’ target=‘_blank’ data-saferedirecturl=‘https://www.iotech.tn/’>Iotech™</a></span></td></tr></tbody></table></td><td style=‘width:20px;padding:7px 0’>&nbsp;</td></tr></tbody></table><div class=‘yj6qo’></div><div class=‘adL’></div></div>'
    let content
    let index = 0
    let totalHT = this.addedOrder.orderDetails.reduce((acc, product) => acc + (product.quantity * (product.price / 1.19)), 0);
    let totalTVA = totalHT * 0.19
    let remise = this.addedOrder.orderDetails.reduce((acc, product) => acc + (product.quantity * product.price * (product.discount / 100)), 0);
    let deliveryPrice = 0
    if (this.addedOrder.totalPrice > 60) {
      deliveryPrice = 0
    } else if (this.deliveryForm.value.forDeliver == 'true') {
      deliveryPrice = 7
    }
    let fiscaleTimbe = 0.6


    this.addedOrder.orderDetails.forEach(element => {
      if (index == 0)
        content = "<img src='https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1628601138/herbabio_bdaxcf.png' style='margin-left: 41% ;' alt=‘Herbabio’ data-image-whitelisted=‘‘ class=‘CToWUd’><br><br><h1 style='text-align: center;color:#000000;'>Commande N° " + this.addedOrder.id + "</h1>" +
          "<span style='color:#000000;'><b>Date de création</b> :" + this.sharedService.formatDate(this.addedOrder.createdAt) +
          "</span><br><span style='color:#000000;'><b>Nom de client </b>:" + this.customerObject.name +
          "<br><br>" + "<table style=' border: 1px solid black; border-collapse: collapse;width:100%;'>" +
          "<tr style='background-color:#DCDCDC;'><th style='border: 1px solid #dddddd; color:#000000;'>Référence</th>   <th style='border: 1px solid #dddddd; color:#000000;'>Produit</th><th style='border: 1px solid #dddddd; color:#000000;'>Quantité</th><th style='border: 1px solid #dddddd; color:#000000;'>P.U HT</th><th style='border: 1px solid #dddddd; color:#000000;'>TVA %</th><th style='border: 1px solid #dddddd; color:#000000;'> Montant HT</th><th style='border: 1px solid #dddddd; color:#000000;'> P.U TTC</th><th style='border: 1px solid #dddddd;'>Remise</th><th style='border: 1px solid #dddddd;color:#000000;'>Montant TTC</th></tr>"
      content = content +
        "<tr><td style='border: 1px solid #dddddd;text-align: center'>" + element.productId["reference"] + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + element.productId["name"] + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + element.quantity + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + (element.price / 1.19).toFixed(2) + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + 19 + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + (element.quantity * ((element.price / 1.19))).toFixed(2) + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + element.price.toFixed(2) + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + 0.00 + "</td><td style='border: 1px solid #dddddd;text-align: center'>" + (element.price * element.quantity).toFixed(2) + "</td></tr>"
      index++
    })
    content = content + "</table><br>" +
      "<table style=' border: 1px solid black; border-collapse: collapse;margin-left:1170px;width:300px;'><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Total HT : </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + totalHT.toFixed(2) + "</td></tr><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Remise: </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + 0.00 + "</td></tr><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Frais de livraison: </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + deliveryPrice.toFixed(2) + "</td></tr><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Timbre fiscal: </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + fiscaleTimbe.toFixed(2) + "</td></tr><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Total TVA : </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + totalTVA.toFixed(2) + "</td></tr><tr><td style='border: 1px solid #dddddd; color:#000000;'><b>Total TTC : </b></td><td style='border: 1px solid #dddddd; color:#000000;'>" + this.addedOrder.totalPrice.toFixed(2) + "&nbsp; DT </td></tr>"
    content = content + "</table>"
    content = content +"<span style='color:#000000;'><b>Mode de livraison:</b> : "+ deliveryMode +"<br><br>"+"<span style='color:#000000;'><b>Mode de paiement:</b> : "+paiementMode +"<br><br>"
    content = content +"<br><br><br>"+"<span style='color:#000000;margin-left:1170px;'><b>Télèphone: (216) 56.040.075 </b>"+"<br><br>"+"<span style='color:#000000;margin-left:1170px;'><b>E-mail: Herbabio.tunisie@gmail.com</b>"

    if (!this.isLogin) {
      this.orderMail = {
        "from": environment.emailSociete,
        "to": this.customerForm.value.email,
        "subject": "Ajout de commande",
        "content": content
      }
      this.welcomeMail = {
        "from": environment.emailSociete,
        "to": this.customerForm.value.email,
        "subject": "Ajout de commande",
        "content": welcomeContent
      }
      this.mailDelivery(this.orderMail);
      this.mailDelivery(this.welcomeMail);
    } else {
      this.orderMail = {
        "from": environment.emailSociete,
        "to": this.contactObject.email,
        "subject": "Ajout de commande",
        "content": content
      }
      this.mailDelivery(this.orderMail);
    }
  }

  mailDelivery(mail: any) {
    this.orderService.sendMail(mail).subscribe(
      data => {
        this.mailSent = true
        this.msgAlert = "L'ajout de commande a été effectué avec succès avec un E-mail de confirmation transmis à votre boîte .."
      }
    )
  }
}
