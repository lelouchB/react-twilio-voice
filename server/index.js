const express = require("express");
const twilio = require("twilio");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const app = express();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const host = "https://your-address.ngrok.io";

app.use(express.json());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(helmet());

const port = 5500;

app.get("/", function (req, res, next) {
  res.send("Hello, How are you? Hope you are doing great.");
});

app.post("/call", function (req, res) {
  app.set("voiceMessage", req.body.message);

  const numberToCall = req.body.numberToCall;
  const displayName = req.body.displayName.replace(/\s/g, "-");

  client.calls
    .create({
      url: `${host}/voice?displayName=${displayName}`,
      to: `${numberToCall}`,
      from: `${TWILIO_PHONE_NUMBER}`,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.error(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post("/voice", function (req, res) {
  const voice = app.get("voiceMessage");
  const displayName = req.query.displayName;

  const message =
    voice || `Take care of the trees, they will take care of you.`;

  const voiceMessage = `Hello ${displayName} ${message}`;

  var VoiceResponse = twilio.twiml.VoiceResponse;
  var twiml = new VoiceResponse();

  const dial = twiml.dial();
  const client = dial.client({});

  client.identity("Ashutosh");

  client.parameter({
    name: "displayName",
    value: displayName,
  });

  twiml.say(voiceMessage, {
    voice: "alice",
  });
  res.setHeader("Content-Type", "text/xml");
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Listenting on port ${port}`);
});
