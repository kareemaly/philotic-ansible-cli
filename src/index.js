#!/usr/bin/env node
const path = require("path");
const admin = require("firebase-admin");
const argv = require("yargs").argv;
const setMobileReminder = require("./actions/setMobileReminder");

let serviceAccount = require("../keys/philotic-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const run = async ({ command }) => {
  let db = admin.firestore();
  let docRef = db.collection("actions");
  if (command.startsWith("remind me")) {
    console.log("Action: set mobile reminder");
    await setMobileReminder(docRef, "remind me", command);
  }
};

let command;

if (process.argv[1] === path.basename(__filename)) {
  command = process.argv.slice(2).join(" ");
} else {
  command = process.argv.slice(2).join(" ");
}

run({ command }).catch(console.error);
