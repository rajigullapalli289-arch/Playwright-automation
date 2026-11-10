class apiUtils {
  constructor(apiContext,loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;

  }

  async getToken() {
    //login API
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );
    if (!loginResponse.ok()) {
      throw new Error(`Login API failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
    }

    const jsonResponse = await loginResponse.json();
    if (!jsonResponse.token) {
      throw new Error(`Login API response did not include a token: ${JSON.stringify(jsonResponse)}`);
    }
    return jsonResponse.token;
  }

  async createOrder(orderPayload) {
    //Order API
    const token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    if (!orderResponse.ok()) {
      throw new Error(`Create order API failed with status ${orderResponse.status()}: ${await orderResponse.text()}`);
    }

    const orderResponseBody = await orderResponse.json();
    if (!Array.isArray(orderResponseBody.orders) || !orderResponseBody.orders[0]) {
      throw new Error(`Create order API response did not include an order: ${JSON.stringify(orderResponseBody)}`);
    }

    return {
      token,
      orderId: orderResponseBody.orders[0],
    };
  }
}

module.exports = {apiUtils};
