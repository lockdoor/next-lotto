export default class Numberbet {
  constructor(numberString, type, price, user, date, recorder, isFree=false) {
    this.numberString = numberString;
    this.type = type;
    this.price = price;
    this.user = user;
    this.date = date;
    this.recorder = recorder;
    this.isFree = isFree;
  }
}