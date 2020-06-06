const chrono = require("chrono-node");
const upperCaseFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const replaceAll = (str, search, replacement) =>
  str.split(search).join(replacement);

const replaceToSecondPerson = str => replaceAll(str, "my", "your");

const strip = str => (str.startsWith("to ") ? str.replace("to ", "") : str);

const setMobileReminder = (docRef, prefix, command) => {
  const strippedCommand = command.replace(prefix, "");
  const parsed = chrono.parse(strippedCommand);
  const when = parsed[0].ref;
  const what = upperCaseFirst(
    strip(
      replaceToSecondPerson(strippedCommand.replace(parsed[0].text, "").trim())
    )
  );

  const action = {
    action: "ADD_NOTIFICATION_ON_MY_MOBILE",
    handled: false,
    input: {
      body: `Kareem, ${what}`,
      date: when,
      title: "[PA Cli] Reminder"
    }
  };

  return docRef.doc().create(action);
};
module.exports = setMobileReminder;
