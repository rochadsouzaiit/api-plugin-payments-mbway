/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default function mbwayPaymentsStartup(context) {
  context.collections.MbwayPaymentRefunds = context.app.db.collection(
    "MbwayPaymentRefunds"
  );
}
