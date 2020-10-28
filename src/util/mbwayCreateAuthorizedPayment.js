import Random from "@reactioncommerce/random";

const METHOD = "debit";
const PACKAGE_NAME = "mbway-paymentmethod";
const PAYMENT_METHOD_NAME = "mbway";

// NOTE: The "processor" value is lowercased and then prefixed to various payment Meteor method names,
// so for example, if this is "Example", the list refunds method is expected to be named "sibs/refund/list"
const PROCESSOR = "SIBS";

/**
 * @summary Payment method that creates the authorization payment
 * @param {Object} context The request context
 * @param {Object} input Input necessary to create a payment
 * @returns {Object} The payment object in schema expected by the orders plugin
 */
export default async function mbwayCreateAuthorizedPayment(context, input) {
  const {
    amount,
    billingAddress,
    shopId,
    paymentData: { token },
  } = input;

  return {
    _id: Random.id(),
    address: billingAddress,
    amount,
    createdAt: new Date(),
    data: {
      token,
      gqlType: "MbwayPaymentData", // GraphQL union resolver uses this
    },
    displayName: `MB-WAY`,
    method: METHOD,
    mode: "authorize",
    name: PAYMENT_METHOD_NAME,
    paymentPluginName: PACKAGE_NAME,
    processor: PROCESSOR,
    riskLevel: "normal",
    shopId,
    status: "created",
    transactionId: Random.id(),
    transactions: [],
  };
}
