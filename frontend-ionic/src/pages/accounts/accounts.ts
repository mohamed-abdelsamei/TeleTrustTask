import {
  AccountDetailsPage
} from './../account-details/account-details';
import {
  RemoteServiceProvider
} from './../../providers/remote-service/remote-service';

import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {
  myfilter: string = '';
  accounts: any = [];
  searching: any = false;
  selectedAccounts: any = [];
  accChecked: boolean;
  totalPrice: any = 0;
  page: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteServiceProvider: RemoteServiceProvider) {
    this.loadAccounts(this.myfilter, this.page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');

  }

  loadAccounts(q: string, p: number) {
    this.searching = true;
    this.remoteServiceProvider.getAllAccounts(q, p).subscribe(accounts => {
      if (accounts.accounts.length == 0) {
        console.log("no data retreived");
      }
      accounts.accounts.forEach(element => {
        this.accounts.push(element);
      });
      this.searching = false;
    })
  }

  filterItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.page = 0;
    this.myfilter = ev.target.value;
    this.accounts = [];
    this.loadAccounts(val, this.page);

  }

  checkAccount(item: any) {
    console.log(item)
    if (this.selectedAccounts.includes(item)) {
      var index = this.selectedAccounts.indexOf(item);
      this.selectedAccounts.splice(index, 1);
    } else {
      this.selectedAccounts.push(item)
    }
    console.log(this.selectedAccounts);
    this.getTotal();

  }

  clear() {
    this.accChecked = false;
    this.accounts.forEach(account => {
      account.checked = false;
    });
    this.selectedAccounts = [];
    console.log(this.selectedAccounts);
  }

  checkAll() {
    this.accChecked = true;
    this.selectedAccounts = [];
    this.accounts.forEach(account => {
      account.checked = true;
      this.selectedAccounts.push(account);
    });
    console.log(this.selectedAccounts);
  }

  getBill(account: any) {

    var p = 0;
    var services = account.services;
    services.forEach(service => {
      p += service.price;
    });
    account.bill = p;
    return p;
  }

  getTotal() {
    var p = 0;
    this.selectedAccounts.forEach(sAcc => {
      p += sAcc.bill;
    })
    return p
  }

  highlight = function (haystack, searchP) {
    if (!searchP) {
      return haystack;
    }
    return (haystack + '').replace(new RegExp(searchP, "gi"), function (match) {
      return '<span class="highlightedText">' + match + '</span>';
    });
  };

  viewAccount(account: any) {
    this.navCtrl.push(AccountDetailsPage, {
      id: account._id,
      number: account.number
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.loadAccounts(this.myfilter, this.page);
      infiniteScroll.complete();
    }, 500);
  }
}
