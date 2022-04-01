import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
  sendMail(mail) {
    return this.http.post("https://iotech-mailer.ioc.tn/api/mails", mail)
  }


  getCookie(cname: string) {
    if (isPlatformBrowser(this.platformId)) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

  }



  getAllCookies() {
    if (isPlatformBrowser(this.platformId)) {
      var pairs = document.cookie.split(";");
      var cookies = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
      }
      return cookies;
    }
  }


  sortData(productArray) {
    for (var i = 0; i < productArray.length - 1; i++) {
      if (productArray[i + 1].id === productArray[i].id) {
        productArray[i + 1].quantity = productArray[i + 1].quantity + productArray[i].quantity
        productArray.splice(i, 1)
      }
    }
    return productArray
  }

  sortByIds(productArray) {
    productArray.sort(function (a, b) {
      return a.id - b.id
    });
  }


  cartItemNumber(productArray) {
    if (productArray) {
      let number: number = 0
      productArray.forEach(element => {
        number = number + element.quantity
      });
      return number
    }
  }

  formatDate(date: any) {
    const inputedDate = new Date(date)
    inputedDate.setDate(inputedDate.getDate())
    let month = '' + (inputedDate.getMonth() + 1),
      day = '' + (inputedDate.getDate()),
      year = inputedDate.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }


  tokenGetter() {
    if (isPlatformBrowser(this.platformId)) {
      var name = "token=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }

  verifMailValidity(mail, allContacts) {
    const existsInBd = allContacts.filter(element => element.email === mail && mail != undefined)
    if (existsInBd.length > 0) {
      return true
    } else {
      return false
    }
  }
}
