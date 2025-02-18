import { Command } from "../../abstract/QuickCommand";
export default class Settings extends Command {
    get name() {
        return "settings";
    }
    get permission() {
        return ["manageGuild"];
    }
    get aliases() {
        return ["config", "setup"];
    }
    get description() {
        return "View the current settings of the server. If you want to setup the bot, check https://guide.green-bot.app/configuration";
    }
    get category() {
        return "Admin Commands";
    }
    async run({ ctx: e }) {
        if (e.args[0])
            return ["reset", "default"].includes(e.args[0])
                ? ((e.guildDB.prefix = "*"),
                  (e.guildDB.announce = true),
                  (e.guildDB.vcs = []),
                  (e.guildDB.defaultVolume = 60),
                  (e.guildDB.auto_autoplay = null),
                  (e.guildDB.vote_skip = true),
                  (e.guildDB.txts = []),
                  (e.guildDB.djroles = []),
                  (e.guildDB.h24 = null),
                  (e.guildDB.auto_shuffle = false),
                  e.client.database.handleCache(e.guildDB),
                  e.successMessage("All settings of the bot have been reset!"))
                : e.send("Want to setup me? Check my setup guide to get started!\nhttps://guide.green-bot.app/configuration");
        e.client.database.checkPremium(e.guild.id).then((t) => {
            e.send({
                embeds: [
                    {
                        color: 0x3a871f,
                        author: { name: `${e.guild.name}`, icon_url: e.guild.icon ? e.guild.iconURL : "https://cdn.discordapp.com/attachments/748897191879245834/782271474450825226/0.png?size=128" },
                        description: `> Prefix: \`${e.guildDB.prefix}\`\n> [Green-bot Premium](https://green-bot.app/premium): ${t.guildId ? `✨ Active | <@${t.userId}>` : "Not active "}\n\nAnnoucing new songs: ${
                            e.guildDB.announce ? "`Enabled`" : "`Disabled`"
                        }\nDefault volume: \`${e.guildDB.defaultVolume}\`\nDj role(s): ${e.guildDB.djroles ? `${e.guildDB.djroles.length > 0 ? e.guildDB.djroles.map((e) => `<@&${e}>`).join(", ") : "`Not set`"}` : "`Not set`"}\n24/7: ${
                            e.guildDB.h24 ? "`Enabled`" : "`Disabled`"
                        }\nVoice channel(s): ${e.guildDB.vcs.length > 0 ? `${e.guildDB.vcs.map((e) => `<#${e}>`)}` : "`Not set`"}\nAllowed text channel(s): ${
                            e.guildDB.txts.length > 0 ? `${e.guildDB.txts.map((e) => `<#${e}>`)}` : "`Not set`"
                        }\nVote skip enabled: ${e.guildDB.vote_skip ? "`Enabled`" : "`Disabled`"}\nAuto shuffle Playlist: ${e.guildDB.auto_shuffle ? "`Enabled`" : "`Disabled`"}\nAuto-Autoplay: ${
                            e.guildDB.auto_autoplay ? "`Enabled`" : "`Disabled`"
                        }\nDj command(s): ${e.guildDB.dj_commands.length > 0 ? `${e.guildDB.dj_commands.map((e) => `\`${e}\``).join(", ")}` : "`Not set`"}`,
                    },
                ],
            });
        });
    }
}
