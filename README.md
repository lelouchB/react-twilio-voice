# Passing Custom Parameters to Twilio Client with Voice REST API
![UI](https://i.imgur.com/vptnUwi.jpg)

## Running the project

To run the project you will need a [Twilio account](www.twilio.com/referral/JbKvV2) and a Twilio phone number that can send make voice calls. Gather your **Twilio Account SID** and **Auth Token** from the [Twilio console](https://www.twilio.com/console) and the phone number.

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/lelouchB/react-twilio-voice.git
cd react-twilio-voice
cd client 
npm install
cd ..
cd server
npm install
```

Rename the `.env.example` file in `server` directory to `.env` and fill in your Twilio credentials and phone number.


Open the **ngrok** tunnel.

```bash
ngrok http 5500
```

Copy paste the **Forwarding** address in `host` variable inside `server/index.js` file.

Start the Express server. Run the following command in project's root directory.

```bash
cd server
npm run dev
```

Start the React app development server. Run the following command in project's root directory.

```bash
cd client
npm start
```
Open the app at [localhost:3000](http://localhost:3000).

You can now use the form to make voice calls.
