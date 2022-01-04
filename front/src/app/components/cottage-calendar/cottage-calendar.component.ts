import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { HotOffer } from 'src/app/model/hot-offer';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';

@Component({
  selector: 'app-cottage-calendar',
  templateUrl: './cottage-calendar.component.html',
  styleUrls: ['./cottage-calendar.component.css']
})
export class CottageCalendarComponent implements OnInit {

  constructor(private cottageReservationService: CottageReservationService) { }

  @Input() cottageForApp: Cottage;
  todayTruly: Date;
  today: Date;
  monthYear: String;
  weekday: Array<String>;
  dayOfWeek: String;
  dayOfMonth: number;
  daysOfMonth: Array<number>;
  firstDayOfMonth: String;
  lastDayOfMonth: String;
  lastDayOfMonthNumber: number;
  saturday: number;
  daysOfMonthBeforeNumber: number;
  hotOffers: Array<HotOffer>;
  cottageReservations: Array<CottageReservation>;
  @Output() sendCottageReservation = new EventEmitter<CottageReservation>();

  ngOnInit(): void {
    this.today = new Date();
    this.init();
    
  }

  init(){
    if(this?.cottageForApp != null){
      this.cottageReservationService.getAllReservationsOfCottage(this.cottageForApp).subscribe(ret => {
        this.cottageReservations = ret;
      })
    }
    this.weekday = new Array<String>()
    this.daysOfMonth = new Array<number>()
    this.weekday[0] = "Sunday";
    this.weekday[1] = "Monday";
    this.weekday[2] = "Tuesday";
    this.weekday[3] = "Wednesday";
    this.weekday[4] = "Thursday";
    this.weekday[5] = "Friday";
    this.weekday[6] = "Saturday";
    this.todayTruly = new Date();
    
    this.monthYear = this.today.getFullYear()+'-'+(this.today.getMonth()+1);
    this.dayOfWeek = this.weekday[this.today.getDay()];
    this.dayOfMonth = this.today.getDate();
    for(let i=1;this.daysInMonth(this.today.getMonth()+1,this.today.getFullYear()) - i >= 0;i++){
      this.daysOfMonth.push(i);
    };
    let firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.firstDayOfMonth = this.weekday[firstDayOfMonth.getDay()];
    let lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), this.daysInMonth(this.today.getMonth()+1,this.today.getFullYear()));
    this.lastDayOfMonth = this.weekday[lastDayOfMonth.getDay()];
    this.lastDayOfMonthNumber = this.daysInMonth(this.today.getMonth()+1,this.today.getFullYear())
    this.daysOfMonthBeforeNumber = this.daysInMonth(this.today.getMonth(),this.today.getFullYear())
    if(this.firstDayOfMonth=="Monday"){
      this.saturday = 6
    }
    else if(this.firstDayOfMonth=="Tuesday"){
      this.saturday = 5
    }
    else if(this.firstDayOfMonth=="Wednesday"){
      this.saturday = 4
    }
    else if(this.firstDayOfMonth=="Thursday"){
      this.saturday = 3
    }
    else if(this.firstDayOfMonth=="Friday"){
      this.saturday = 2
    }
    else if(this.firstDayOfMonth=="Saturday"){
      this.saturday = 1
    }
    else if(this.firstDayOfMonth=="Sunday"){
      this.saturday = 7
    }
  }

  next(){
    if(this.today.getMonth()<11){
      this.today = new Date(this.today.getFullYear(), this.today.getMonth()+1,1);}
    else{
      this.today = new Date(this.today.getFullYear()+1, 0,1);
    }
    this.init();

  }
  prev(){
    if(this.today.getMonth()!=0){
      this.today = new Date(this.today.getFullYear(), this.today.getMonth()-1,1);}
    else{
      this.today = new Date(this.today.getFullYear()-1, 11,1);
    }
    this.init();
  }

  daysInMonth (month, year): number {
    return new Date(year, month, 0).getDate();
  }

  isItTaken(day:number) : Array<string> {
    
    let response = new Array<string>()
    if(this.cottageForApp?.hotOffers != null){
      for (let hotOffer of this.cottageForApp?.hotOffers){
        let availableFrom = new Date(hotOffer.availableFrom);
        let availableTill = new Date(hotOffer.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
          response.push('free');
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear()){
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            response.push('Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()>this.today.getMonth()){
            response.push('Hot');
          }
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            response.push('Hot');
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push('Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            response.push('End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else {
            response.push('free');
          }
        }
        else{
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            response.push('Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()>this.today.getMonth()){
            response.push('Hot');
          }
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            response.push('Hot');
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push('Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            response.push('End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else {
            response.push('free');
          }

        }
        
      }
    }
    return response;
    
  }

  isItTakenNextMonth(day:number) : Array<string> {
    
    let response = new Array<string>();
    if(this.cottageForApp?.hotOffers != null){
      for (let hotOffer of this.cottageForApp?.hotOffers){
        let availableFrom = new Date(hotOffer.availableFrom);
        let availableTill = new Date(hotOffer.availableTill);

        if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){

          if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() == day){
            response.push('Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()>(this.today.getMonth()+1)){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()==(this.today.getMonth()+1) && availableTill.getDate() > day){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push( 'Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()+1)){
            response.push( 'End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
        else{

          let month;
          let year;
          if(this.today.getMonth()==11){
            month = 0;
            year = this.today.getFullYear()+1;
          }
          else {
            month = this.today.getMonth()+1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            response.push( 'Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            response.push( 'Hot');
          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push( 'Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            response.push( 'End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
      }
    }
    return response;
  }

  isItTakenPrevMonth(day:number) : Array<string> {
    
    let response = new Array<string>();
    if(this.cottageForApp?.hotOffers != null){
      for (let hotOffer of this.cottageForApp?.hotOffers){
        let availableFrom = new Date(hotOffer.availableFrom);
        let availableTill = new Date(hotOffer.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
          response.push('free');
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){
          if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() == day){
            response.push( 'Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()>(this.today.getMonth()-1)){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()==(this.today.getMonth()-1) && availableTill.getDate() > day){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push( 'Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()-1)){
            response.push( 'End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
        else{
          let month;
          let year;
          if(this.today.getMonth()==0){
            month = 11;
            year = this.today.getFullYear()-1;
          }
          else {
            month = this.today.getMonth()-1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            response.push( 'Start of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            response.push( 'Hot');
          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            response.push( 'Hot');
          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push( 'Hot');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            response.push( 'End of Hot Offer: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }

        }
      }
    }
    return response;
  }


  isItTakenReservation(day:number) : Array<string> {
    
    let response = new Array<string>()
    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
          response.push('free');
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear()){
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            response.push('Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()>this.today.getMonth()){
            response.push('Reserved');
          }
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            response.push('Reserved');
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push('Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            response.push('End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else {
            response.push('free');
          }
        }
        else{
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            response.push('Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()>this.today.getMonth()){
            response.push('Reserved');
          }
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            response.push('Reserved');
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push('Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            response.push('End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else {
            response.push('free');
          }

        }
        
      }
    }
    return response;
    
  }

  isItTakenNextMonthReservation(day:number) : Array<string> {
    
    let response = new Array<string>();
    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);

        if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){

          if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() == day){
            response.push('Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()>(this.today.getMonth()+1)){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()==(this.today.getMonth()+1) && availableTill.getDate() > day){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push( 'Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()+1)){
            response.push( 'End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
        else{

          let month;
          let year;
          if(this.today.getMonth()==11){
            month = 0;
            year = this.today.getFullYear()+1;
          }
          else {
            month = this.today.getMonth()+1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            response.push( 'Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            response.push( 'Reserved');
          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push( 'Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            response.push( 'End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
      }
    }
    return response;
  }

  isItTakenPrevMonthReservation(day:number) : Array<string> {
    
    let response = new Array<string>();
    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
          response.push('free');
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){
          if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() == day){
            response.push( 'Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()>(this.today.getMonth()-1)){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()==(this.today.getMonth()-1) && availableTill.getDate() > day){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            response.push( 'Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()-1)){
            response.push( 'End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }
        }
        else{
          let month;
          let year;
          if(this.today.getMonth()==0){
            month = 11;
            year = this.today.getFullYear()-1;
          }
          else {
            month = this.today.getMonth()-1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            response.push( 'Start of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            response.push( 'Reserved');
          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            response.push( 'Reserved');
          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            response.push( 'Reserved');
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            response.push( 'End of Reservation: '+availableFrom.getHours().toString()+':'+availableFrom.getMinutes().toString());
          }
          else{
            response.push('free');
          }

        }
      }
    }
    return response;
  }


  isItTakenReservationReport(day:number) : void {
    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
          
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear()){
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            this.addReport(cottageReservation);
          }
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()>this.today.getMonth()){
            this.addReport(cottageReservation);
          }
          else if(availableFrom.getMonth()<this.today.getMonth() && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            this.addReport(cottageReservation);
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            this.addReport(cottageReservation);
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            this.addReport(cottageReservation);
          }
          else {
          }
        }
        else{
          if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() == day){
            this.addReport(cottageReservation);
          }
          
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()>this.today.getMonth()){
            this.addReport(cottageReservation);
          }
          else if((availableFrom.getMonth()<this.today.getMonth() || availableFrom.getFullYear()<this.today.getFullYear()) && availableTill.getMonth()==this.today.getMonth() && availableTill.getDate() > day){
            this.addReport(cottageReservation);
          }
          else if(availableFrom.getMonth()==this.today.getMonth() && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            this.addReport(cottageReservation);
          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==this.today.getMonth()){
            this.addReport(cottageReservation);
          }
          else {
            
          }

        }
        
      }
    }
    
  }

  isItTakenNextMonthReservationReport(day:number) :void{
    
    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);

        if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){

          if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() == day){
            this.addReport(cottageReservation);
          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()>(this.today.getMonth()+1)){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()<(this.today.getMonth()+1) && availableTill.getMonth()==(this.today.getMonth()+1) && availableTill.getDate() > day){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()==(this.today.getMonth()+1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            this.addReport(cottageReservation);          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()+1)){
            this.addReport(cottageReservation);          }
          else{
          }
        }
        else{

          let month;
          let year;
          if(this.today.getMonth()==11){
            month = 0;
            year = this.today.getFullYear()+1;
          }
          else {
            month = this.today.getMonth()+1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            this.addReport(cottageReservation);          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            this.addReport(cottageReservation);          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            this.addReport(cottageReservation);          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            this.addReport(cottageReservation);          }
          else{
          }
        }
      }
    }
  }

  isItTakenPrevMonthReservationReport(day:number) : void {

    if(this?.cottageReservations != null){

      for (let cottageReservation of this.cottageReservations){
        let availableFrom = new Date(cottageReservation.availableFrom);
        let availableTill = new Date(cottageReservation.availableTill);
        if(availableFrom.getFullYear()<this.today.getFullYear() && availableTill.getFullYear()<this.today.getFullYear()){
        }
        else if(availableFrom.getFullYear()==availableTill.getFullYear() && availableFrom.getFullYear()==this.today.getFullYear()){
          if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() == day){
            this.addReport(cottageReservation);          }
          
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()>(this.today.getMonth()-1)){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()<(this.today.getMonth()-1) && availableTill.getMonth()==(this.today.getMonth()-1) && availableTill.getDate() > day){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()==(this.today.getMonth()-1) && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth())){
            this.addReport(cottageReservation);          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==(this.today.getMonth()-1)){
            this.addReport(cottageReservation);          }
          else{
          }
        }
        else{
          let month;
          let year;
          if(this.today.getMonth()==0){
            month = 11;
            year = this.today.getFullYear()-1;
          }
          else {
            month = this.today.getMonth()-1;
            year = this.today.getFullYear();
          }
          if(availableFrom.getMonth()==month && availableFrom.getDate() == day){
            this.addReport(cottageReservation);          }
          
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()>month && availableTill.getFullYear()==year){
            this.addReport(cottageReservation);          }
          else if((availableFrom.getMonth()<month || availableFrom.getFullYear()<year) && availableTill.getMonth()==month && availableTill.getDate() > day && availableTill.getFullYear()==year){
            this.addReport(cottageReservation);          }
          else if(availableFrom.getMonth()==month && availableFrom.getDate() < day && (availableTill.getDate() > day || availableTill.getMonth()>availableFrom.getMonth() || availableTill.getFullYear()>availableFrom.getFullYear())){
            this.addReport(cottageReservation);          }
          else if(availableTill.getDate() == day && availableTill.getMonth()==month){
            this.addReport(cottageReservation);          }
          else{
          }

        }
      }
    }
  }

  addReport(cottageReservation: CottageReservation){
    if(this.isOwer(cottageReservation)){
      if(cottageReservation.report == null|| cottageReservation.report == undefined){
        this.sendCottageReservation.emit(cottageReservation);
      }
      else{
        alert("Reservation already has an report");
      }
    }
    else{
      alert("Reservation is not finished");
    }
    
  }
  isOwer(cottageReservation: CottageReservation): boolean{
    let datum = new Date();
    if (new Date(Date.parse(cottageReservation.availableTill.toString())).getTime() < datum.getTime()){
        return true;
    }
    return false;
  }

}
