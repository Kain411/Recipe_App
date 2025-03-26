class Order {
  constructor(id, user_id, totalPrice, paymentType, paymentDate, note) {
    this.id = id;
    this.user_id = user_id;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
    this.paymentDate = paymentDate;
    this.note = note;
  }
}

module.exports = Order;
