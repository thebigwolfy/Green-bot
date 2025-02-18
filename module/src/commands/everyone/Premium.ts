import { Command } from "../../abstract/QuickCommand";
const fetch = require("node-fetch");
export default class Premium extends Command {
    get name() {
        return "premium";
    }
    get category() {
        return "Everyone Commands";
    }
    get description() {
        return "Shows your premium status";
    }
    get aliases() {
        return ["pr"];
    }
    static invite(e) {
        return `https://discord.com/api/oauth2/authorize?client_id=${e}&permissions=139623484672&scope=bot%20applications.commands`;
    }
    async run({ ctx: e }) {
        const t = e.args[0];
        if (t) {
            const r = e.premiumlink("premiumUser") + "userId=" + e.member.id,
                i = await fetch(r).catch((e) => console.error(e)),
                o = await i.json(),
                s = e.premiumlink("premiumGuild") + "guildId=" + e.guild.id,
                n = await fetch(s).catch((e) => console.error(e)),
                a = await n.json();
            if (!["status", "activate", "active", "deactivate"].includes(t)) return e.errorMessage("Please provide a valid action: status, activate or deactivate");
            if (t)
                if ("status" === t) {
                    if (!o) return e.errorMessage("You don't have a premium subscription yet, you need to buy one on the [Patreon page](https://green-bot.app/premium/buy)");
                    e.send({
                        embeds: [
                            {
                                author: {
                                    name: "Green-Bot Premium",
                                    icon_url: e.client.user.dynamicAvatarURL(),
                                    url: "https://discord.com/oauth2/authorize?client_id=901466922820988968&scope=bot&permissions=19456",
                                },
                                description: "Your Premium subscription Status",
                                fields: [
                                    {
                                        name: "Status",
                                        value: `${o
                                                ? "✅ You currently have the premium\n\n**Tier**: " +
                                                o.tiers.map(t => t.name+" ("+t.id+"), ")+
                                                "\n**Guilds left**: " +
                                                o.guildsLeft + "/" + o.allGuilds +
                                                "\n**Lifetime**: " + o.lifetime +
                                                "\n**Custom**: " + o.custom +
                                                `${o.expires ? `\n**Expiration**: <t:${o.expires}:f> (<t:${o.expires}:R>)` : ""}` +
                                                "\n**Premium Server**: " +
                                                o.premiumGuilds +
                                                "\n\n"
                                                : " You don't have the premium yet. Buy the premium on the [Patreon page](https://green-bot.app/premium/buy)"
                                            }`,
                                    },
                                ],
                                color: 0x3A871F,
                                footer: { text: "Green-Bot | green-bot.app", icon_url: e.client.user.dynamicAvatarURL() },
                            },
                        ],
                    });
                } else {
                    if ("activate" === t || "active" === t) {
                        if (!o) return e.errorMessage("You don't have a premium subscription yet, you need to buy one on the [Patreon page](https://green-bot.app/premium/buy)");
                        if (0 === o.allGuilds)
                            return e.errorMessage(
                                "You need to upgrade your subscription to the **Green-bot Premium x1** tier to use this command\n You can upgrade your subscription on the [Patreon page](https://green-bot.app/premium/buy)"
                            );
                        if (0 === o.guildsLeft) return e.errorMessage("You have already used all your guilds premium, you need to buy more to use this command.");
                        if (a.guildId) return e.errorMessage("This server already has premium activated.");
                        const t = e.premiumlink("premiumUser") + "action=addPremiumGuild",
                            r = { userId: e.member.id, guildId: e.guild.id };
                        await fetch(t, { method: "post", body: JSON.stringify(r), headers: { "Content-Type": "application/json" } }).catch((e) => console.error(e));
                        const i = e.premiumlink("premiumGuild") + "action=add",
                            s = { guildId: e.guild.id, userId: e.member.id };
                        return (
                            await fetch(i, { method: "post", body: JSON.stringify(s), headers: { "Content-Type": "application/json" } }).catch((e) => console.error(e)),
                            e.successMessage("You have successfully activated the premium on this server.")
                        );
                    }
                    if ("deactivate" === t) {
                        if (!o) return e.errorMessage("You don't have a premium subscription yet, you need to buy one on the [Patreon page](https://green-bot.app/premium/buy)");
                        if (0 === o.allGuilds)
                            return e.errorMessage(
                                "You need to upgrade your subscription to the **Green-bot Premium x1** tier to use this command\n You can upgrade your subscription on the [Patreon page](https://green-bot.app/premium/buy)"
                            );
                        if (o.owner !== true) {
                            if (o.allGuilds === o.guildsLeft || !o.premiumGuilds) return e.errorMessage("You don`t have used your guilds premium.");
                        }
                        if (!o.premiumGuilds.includes(e.guild.id)) return e.errorMessage("You didn't make this Server Premium");
                        if (!a || !a.guildId) return e.errorMessage("The Server isn't Premium");
                        const t = e.premiumlink("premiumUser") + "action=deletePremiumGuild",
                            r = { userId: e.member.id, guildId: e.guild.id };
                        await fetch(t, { method: "post", body: JSON.stringify(r), headers: { "Content-Type": "application/json" } }).catch((e) => console.error(e));
                        const i = e.premiumlink("premiumGuild") + "action=delete",
                            s = { guildId: e.guild.id };
                        return (
                            await fetch(i, { method: "post", body: JSON.stringify(s), headers: { "Content-Type": "application/json" } }).catch((e) => console.error(e)),
                            e.successMessage("You have successfully deactivated the premium on this server.")
                        );
                    }
                }
            else
                e.send({
                    embeds: [
                        {
                            author: { name: "| Premium", icon_url: e.client.user.dynamicAvatarURL(), url: Premium.invite(e.client.user.id) },
                            description: "Unlock more of Green-bot with the premium!",
                            fields: [
                                {
                                    name: "How can I buy Green-bot Premium?",
                                    value: "It's super easy! Just go to [this page](https://www.patreon.com/join/GreenBotDiscord/checkout?rid=7861330&cadence=1), checkout and access to the perks without doing any command!",
                                },
                                {
                                    name: "What gives Green-bot premium ?",
                                    value:
                                        "**►Access to @Green-bot 4#8290  (Better stability and quality)**\n                                    **►No need to vote every 12H for some commands.**\n                                    **►Access to 1 premium server ( Everyone will have premium perks on this server)**\n                                    **►Ability to custom the bot messages**\n                                    **►Access to 4 new filters**\n                                    **►Possibily to set a default track announcement channel**\n                                    **►And many more...**",
                                },
                                {
                                    name: "How it works?",
                                    value: `Use \`/premium status\` to see your premium subription.\nUse \`/premium activate\` to activate the premium on a server.\nUse \`/premium deactivate\` to deactivate the premium on a server.`,
                                },
                            ],
                            color: 0x3A871F,
                            footer: { text: "Green-Bot | green-bot.app", icon_url: e.client.user.dynamicAvatarURL() },
                        },
                    ],
                    content: null,
                });
        } else
            e.send({
                embeds: [
                    {
                        author: { name: "| Premium", icon_url: e.client.user.dynamicAvatarURL(), url: Premium.invite(e.client.user.id) },
                        description: "Unlock more of Green-bot with the premium!",
                        fields: [
                            {
                                name: "How can I buy Green-bot Premium?",
                                value: "It's super easy! Just go to [this page](https://www.patreon.com/join/GreenBotDiscord/checkout?rid=7861330&cadence=1), checkout and access to the perks without doing any command!",
                            },
                            {
                                name: "What gives Green-bot premium ?",
                                value:
                                    "**►Access to @Green-bot 4#8290  (Better stability and quality)**\n                                **►No need to vote every 12H for some commands.**\n                                **►Access to 1 premium server ( Everyone will have premium perks on this server)**\n                                **►Ability to custom the bot messages**\n                                **►Access to 4 new filters**\n                                **►Possibily to set a default track announcement channel**\n                                **►And many more...**",
                            },
                            {
                                name: "How it works?",
                                value: `Use \`/premium status\` to see your premium subription.\nUse \`/premium activate\` to activate the premium for everyone in this server.\nUse \`/premium deactivate\` to deactivate the premium on a server.`,
                            },
                        ],
                        color: 0x3A871F,
                        footer: { text: "Green-Bot | green-bot.app", icon_url: e.client.user.dynamicAvatarURL() },
                    },
                ],
                content: null,
            });
    }
}
