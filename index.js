const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



const { Client, GatewayIntentBits, MessageType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    try {
        if (message.type === MessageType.ThreadCreated || message.type === 18) {
            await message.delete();
            console.log(`تم حذف رسالة إنشاء الثريد بنجاح من القناة: ${message.channel.name}`);
        }
    } catch (error) {
        console.error('حدث خطأ أثناء محاولة حذف رسالة الثريد:', error);
    }
});

client.login(process.env.DISCORD_TOKEN);