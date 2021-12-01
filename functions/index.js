const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  if (user.email) {
    await initializeNewUser(user);
  }
});

async function initializeNewUser(user) {
  const emailDomain = user.email?.split("@")[1];

  let domainDoc = undefined;
  let orgDoc = undefined;

  console.log(`Processing Domain ${emailDomain}`);

  // Ensure every email address we have has a valid domain
  domainDoc = await db.collection("domains").doc(emailDomain).get();
  if (!domainDoc.data()) {
    // If we have never seen this domain, go ahead and point it to a new organization
    await db
      .collection("domains")
      .doc(emailDomain)
      .create({ domain: emailDomain, organization: emailDomain });
    // TODO: Figure out how to consolidate the create + get into one method
    domainDoc = await db.collection("domains").doc(emailDomain).get();

    console.log(`Successfully created a new domain`);
  }

  // Find the organization tied to this domain (may not exist yet)
  orgDoc = await db
    .collection("organizations")
    .doc(domainDoc.data().organization)
    .get();
  console.log(
    `Domain is tied to Organziation ${domainDoc.data().organization}`
  );

  // If it didn't exist, go ahead and create it
  if (!orgDoc.data()) {
    await db
      .collection("organizations")
      .doc(emailDomain)
      .create({ organization: emailDomain, domains: [emailDomain] });
    // TODO: Figure out how to consolidate the create + get into one method
    orgDoc = await db.collection("organizations").doc(emailDomain).get();
    console.log(`New Organization successfully created`);
  }

  db.collection("users")
    .doc(user.uid)
    .set({
      ...JSON.parse(JSON.stringify(user)),
      domain: emailDomain,
      organization: orgDoc.data().organization,
    });
}

// let testUser = {
//   email: "test.vanweelden@scale4.com",
//   uid: Math.round(Math.random() * 100000),
// };

// (async () => {
//   await initializeNewUser(testUser);
// })();
