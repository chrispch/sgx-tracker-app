import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ListItem } from './list_item';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ DataProvider ]
})
export class ListPage implements OnInit{
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  data: any;
  dailyPrices: Array<any> = [];
  tradeSession:string = "0";
  contract:string = "SGP";
  contractList:Array<string> = ['PH', 'EM', 'NEA', 'INQ', 'ID', 'NS', 'NMD', 'NEM', 'ING', 'INI', 'INB', 'IN', 'NSG', 'NID', 'NU', 'NCH', 'NTW', 'ST', 'MD', 'TH', 'CH', 'NK', 'SGP', 'MY', 'CN', 'TW'];
  contractYear:string = "2018";
  contractMonth:string = "03";
  years:Array<string> = ['2018', '2019', '2020'];
  months:Array<string> = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  noItems:Boolean = false;
  // list_items: ListItem;


  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider:DataProvider) {}

  ngOnInit(){
    this.showDailyPrices(this.contract, this.tradeSession, this.contractYear + "-" + this.contractMonth);
  }

  submitForm(event){
    console.log(event);
    console.log(this.contract, this.contractYear, this.contractMonth, this.tradeSession);
    if (this.contract && this.contractYear && this.contractMonth && this.tradeSession) {
      let contractDate = this.contractYear + "-" + this.contractMonth;
      console.log(contractDate);
      this.showDailyPrices(this.contract, this.tradeSession, contractDate);
    }
  }

  toggleList(listItem:ListItem){
    listItem.show_list = listItem.show_list ? false : true;
  }

  showDailyPrices(contract:string, trade_session:string, contract_month:string){
    this.dailyPrices = [];
    this.dataProvider.getData(contract, trade_session, contract_month)
    .subscribe(data => {
      if (data["_items"]["length"] !== 0) {
        this.noItems = false;
        data = data["_items"]["0"]["daily"];
        // convert dictionary of daily prices to array of daily prices
        Object.keys(data).map(d => {
          let listItem:ListItem = data[d];
          listItem.show_list = false;
          this.dailyPrices.push(listItem);
        });
        for (let p in this.dailyPrices) {
          console.log(p);
          console.log(this.dailyPrices[p]);
        }
      }
      else {
        this.noItems = true;
      }
    });
  }
}
