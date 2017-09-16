import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {
  account: any;
  title: String;
  searching: Boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteServiceProvider: RemoteServiceProvider) {
    this.title = navParams.get('number');
    let id = navParams.get('id');
    console.log(this.title)
    this.getOrderData(id);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailsPage');
  }
  getOrderData(id: any) {
    this.remoteServiceProvider.getAccount(id).subscribe(account => {
      this.account = account.account;
      this.searching = false;

    })
  }


}
