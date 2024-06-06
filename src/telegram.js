import { Telegraf } from "telegraf";

export async function sendMessage(message) {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
}
