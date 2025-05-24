require("dotenv").config();
const { WebClient } = require("@slack/web-api");

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.CHANNEL_ID;

const slackClient = new WebClient(token);

/* Sending Message */
async function sendMessage(string) {
  const response = await slackClient.chat.postMessage({
    channel: channel,
    text: string,
  });

  console.log("Message sent: ", response.ts);
}

// sendMessage("Hello World String Method");

/* Getting Messages */
async function getMessages() {
  const response = await slackClient.conversations.history({
    channel: channel,
    limit: 5,
  });

  response.messages.forEach((msg) => {
    console.log(`[${msg.ts}] ${msg.text}`);
  });
}
// getMessages();

/* Edit Message Using TimeStamp */
async function editMessage(ts, string) {
  const response = await slackClient.chat.update({
    channel: channel,
    ts: ts,
    text: string,
  });

  console.log("Message updated.");
}

// editMessage(1748073851.271659, "Hello Updated Via TS");

/* Delete MEssage using TimeStamp */

async function deleteMessage(ts) {
  await slackClient.chat.delete({
    channel: channel,
    ts: ts,
  });

  console.log("Message deleted.");
}

// sendMessage("Test MEssage Sent To Delete");
// deleteMessage(1748074848.368979);

/* Schedule Message */

async function scheduleMessage(string) {
  const postAt = Math.floor(Date.now() / 1000) + 120; // 1 min later

  const response = await slackClient.chat.scheduleMessage({
    channel: channel,
    text: string,
    post_at: postAt,
  });

  console.log("Scheduled message ID:", response.scheduled_message_id);
}

// scheduleMessage("Scheduled Message After 120 second");
