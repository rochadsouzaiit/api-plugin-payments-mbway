import pkg from "../package.json";
import i18n from "./i18n/index.js";
import schemas from "./schemas/index.js";
import mbwayCapturePayment from "./util/mbwayCapturePayment.js";
import mbwayCreateAuthorizedPayment from "./util/mbwayCreateAuthorizedPayment.js";
import mbwayCreateRefund from "./util/mbwayCreateRefund.js";
import mbwayListRefunds from "./util/mbwayListRefunds.js";
import startup from "./startup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "MB Way",
    name: "mbway",
    version: pkg.version,
    i18n,
    graphQL: {
      schemas,
    },
    functionsByType: {
      startup: [startup],
    },
    paymentMethods: [
      {
        name: "mbway",
        canRefund: true,
        displayName: "MB Way",
        functions: {
          capturePayment: mbwayCapturePayment,
          createAuthorizedPayment: mbwayCreateAuthorizedPayment,
          createRefund: mbwayCreateRefund,
          listRefunds: mbwayListRefunds,
        },
      },
    ],
  });
}
