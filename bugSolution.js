const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.handleWrite = functions.database.ref('/data/{pushId}').onWrite(async (change, context) => {
  // Get the current value of the data
  const newValue = change.after.val();
  const pushId = context.params.pushId;

  await db.collection('data').doc(pushId).runTransaction(async (transaction) => {
    const doc = await transaction.get(db.collection('data').doc(pushId));
    if (!doc.exists) {
      transaction.set(db.collection('data').doc(pushId), newValue);
    } else {
      // Perform a safe update, handling race conditions
      const currentValue = doc.data();
      // ... update logic safely, considering race conditions ...
      transaction.update(db.collection('data').doc(pushId), {...currentValue, ...newValue});
    }
  });
});