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

        const messages = [
            ...(
                await faqChannel.messages.fetch({
                    limit: 100,
                })
            ).values(),
        ]
            .filter((message) => message.author.id === client.user?.id)
            .sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        const newMessages = await getNewMessages();

        const sizeDifference = messages.length - newMessages.length;
        if (sizeDifference > 0) {
            console.log(
                `Deleting ${sizeDifference} unnecessary FAQ message${
                    sizeDifference === 1 ? "" : "s"
                }`
            );
            await Promise.all(
                messages.splice(newMessages.length).map((message) => message.delete())
            );
        } else if (sizeDifference < 0) {
            console.log(
                `Adding ${-sizeDifference} necessary FAQ message${-sizeDifference === 1 ? "" : "s"}`
            );
            messages.push(
                ...(
                    await Promise.all(
                        Array(-sizeDifference)
                            .fill(0)
                            .map(() => faqChannel.send(`_ _`))
                    )
                ).sort((a, b) => a.createdTimestamp - b.createdTimestamp)
            );
        }

        let updatedCount = 0;
        await Promise.all(
            messages.map(async (message, index) => {
                const newMessage = newMessages[index];
                if (message.content !== newMessage) {
                    await message.edit(newMessage);
                    updatedCount++;
                }
            })
        );

        console.log(`Updated ${updatedCount} FAQ message${updatedCount === 1 ? "" : "s"}`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});

/**
 * @param {string} message
 * @returns {string[]}
 */
function splitMessage(message) {
    const maxLength = 2000 - 2;
    if (message.length <= maxLength) return [message];
    const lines = message.split("\n");
    if (lines.some((line) => line.length > maxLength))
        throw new Error("Heck this, add some newlines!");
    const messages = [];
    let msg = "";
    for (const line of lines) {
        if (msg && (msg + "\n" + line).length > maxLength) {
            messages.push(msg);
            msg = "";
        }
        msg += (msg ? "\n" : "") + line;
    }
    messages.push(msg);
    return messages.filter(Boolean);
}

async function getNewMessages() {
    const rawContent = await readFile("../../wiki/FAQ.md", "utf8");
    const [_frontmatter, rawQuestions] = rawContent.split("# FAQ").map((section) => section.trim());
    const messages = rawQuestions
        .replace(/{{site.baseurl}}/g, "https://bluemap.bluecolored.de")
        .replace(/<br>/g, "\n")
        .split(/^###? /m)
        .slice(1)
        .flatMap((question) => {
            const [title, ...lines] = question.trim().split("\n");
            const content = lines
                .join("\n")
                .trimEnd()
                .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_match, name, link) => {
                    if (name === link) return `<${link}>`;
                    if (link.startsWith("https://discord.com/channels/")) return link;
                    if (link.startsWith("#")) return name;
                    return `__${name}__ (<${link}>)`;
                });
            const message = `##${title.startsWith("Q:") ? "#" : ""} ${title}\n${content}`;
            return splitMessage(message);
        })
        .map((message) => message.replace(/^\s+/, (m) => `_${m}_`));
    return messages;
}
