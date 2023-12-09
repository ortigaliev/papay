const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");
// The Order class in this code is designed to manage order data in a Node.js application, interfacing with MongoDB through Mongoose models.

class Order {
  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }

  async createOrderData(member, data) {
    //  This method calculates the total amount of an order by iterating over each item in the data array, summing up the products of quantities and prices. It adds a delivery cost if the total amount is below a certain threshold, then saves the order data using saveOrderData method and logs the generated order ID.
    try {
      let order_total_amount = 0,
          delivery_cost = 0;
      const mb_id = shapeIntoMongooseObjectId(member._id);

      data.map((item) => {
        order_total_amount += item["quantity"] * item["price"];
      });

      if (order_total_amount < 100) {
        delivery_cost = 2;
        order_total_amount += delivery_cost;
      }

      const order_id = await this.saveOrderData(
        order_total_amount,
        delivery_cost,
        mb_id
      );

      console.log("order_id::", order_id);
      //TODO: order items creation
     // await this.recordOrderItemsData(order_id, data);
      return order_id;
    } catch (err) {
      throw err;
    }
  }

  async saveOrderData(order_total_amount, delivery_cost, mb_id) {
    try {
      const new_order = new this.orderModel({
        order_total_amount: order_total_amount,
        order_delivery_cost: delivery_cost,
        mb_id: mb_id,
      });

      const result = await new_order.save();
      assert.ok(result, Definer.order_err1);

      return result._id;
    } catch (err) {
      console.log(err);
      throw new Error(Definer.order_err1);
    }
  }

}

module.exports = Order;