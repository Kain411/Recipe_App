class Order {
  constructor(id, user_id, name, phone, strict, ward, district, province, totalPrice, status, shippingFee, paymentType) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.phone = phone;
    this.strict = strict;
    this.ward = ward;
    this.district = district;
    this.province = province;
    this.shippingFee = shippingFee;
    this.paymentType = paymentType;
    this.status = status;
    this.totalPrice = totalPrice;
  }
}

module.exports = Order;
