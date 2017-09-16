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
  myfilter: String = '';
  accounts: any = [];
  searching: any = false;
  selectedAccounts: any = [];
  accChecked: Boolean;
  totalPrice: any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteServiceProvider: RemoteServiceProvider) {
    this.loadAccounts(this.myfilter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');

  }

  loadAccounts(q: String) {
    this.searching = true;
    this.remoteServiceProvider.getAllAccounts(q).subscribe(accounts => {
      this.accounts = accounts.accounts;
      this.searching = false;
    })
  }



  filterItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.loadAccounts(val);

    console.log(val)
    // if the value is an empty string don't filter the items
    if (val) {
      this.accounts = this.accounts.filter((account) => {
        return ((account.number + '').toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.loadAccounts(val);
    }

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
      console.log(match)
      return '<span class="highlightedText">' + match + '</span>';
    });
  };

  viewAccount(account: any) {
    console.log(account);
    this.navCtrl.push(AccountDetailsPage, {
      id: account._id,
      number: account.number
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        console.log(i);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
