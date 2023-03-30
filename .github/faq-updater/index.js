import { Client } from "discord.js";
import { readFile } from "node:fs/promises";

const client = new Client({
    intents: [],
    allowedMentions: { parse: [] },
});

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CHANNEL) {
    console.error("Missing DISCORD_TOKEN or DISCORD_CHANNEL environment variable");
    process.exit(1);
}

// yes we are using the poor man's typescript

const discordToken = /** @type {string} */ (process.env.DISCORD_TOKEN);
const channelId = /** @type {string} */ (process.env.DISCORD_CHANNEL);

client.login(discordToken);

client.on("ready", async () => {
    try {
        const faqChannel = await client.channels.fetch(channelId);

        if (!faqChannel || !faqChannel.isTextBased()) {
            console.error("Channel not found");
            process.exit(1);
        }

        const oldMessages = [
            ...(
                await faqChannel.messages.fetch({
                    limit: 100,
                })
            ).values(),
        ]
            .filter((message) => message.author.id === client.user?.id)
            .sort((a, b) => b.createdTimestamp - a.createdTimestamp);

        const newMessages = await getFaqEntries();

        for (const message of oldMessages) {
            const oldTitle = message.content.split("\n")[0].slice(2, -2);
            if (newMessages.every((newMessage) => newMessage.title !== oldTitle)) {
                console.log("Deleting outdated FAQ entry", oldTitle);
                await message.delete();
            }
        }

        for (const message of newMessages) {
            const oldMessage = oldMessages.find((oldMessage) =>
                oldMessage.content.startsWith(`**${message.title}**`)
            );
            const newContent = `**${message.title}**\n${message.content}\n-------`;
            if (oldMessage) {
                if (oldMessage.content === newContent) continue;
                console.log("Updating FAQ entry", message.title);
                await oldMessage.edit(newContent);
            } else {
                console.log("Adding new FAQ entry", message.title);
                await faqChannel.send(newContent);
            }
        }

        console.log("FAQ updated to Discord");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});

async function getFaqEntries() {
    const rawContent = await readFile("../../wiki/FAQ.md", "utf8");
    const [_frontmatter, rawQuestions] = rawContent.split("# FAQ").map((section) => section.trim());
    const questions = rawQuestions
        .replace(/{{site.baseurl}}/g, "https://bluemap.bluecolored.de")
        .replace(/<br>/g, "\n")
        .split(/^###? /m)
        .slice(1)
        .map((question) => {
            const [title, ...content] = question.trim().split("\n");
            return {
                title,
                content: content
                    .join("\n")
                    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_match, name, link) => {
                        if (name === link) return `<${link}>`;
                        if (link.startsWith("#")) return name;
                        return `${name} (<${link}>)`;
                    }),
            };
        });
    return questions;
}
