const BaseCommand = require("../../abstract/BaseCommand.js");
class Play extends BaseCommand {get name() { return "join" }
    get description() { return "Joins your voice channel" }get aliases() { return ["connect", "summon"] }
    get category() { return "Everyone Commands" }get playerCheck() { return { voice: !0, dispatcher: !1, channel: !0 } }
    async run({ ctx: e }) { if (!e.dispatcher || !e.dispatcher.player.connection) { if (!e.member.voice.channel.joinable || !e.member.voice.channel.viewable) return e.errorMessage("I don't have the required permissions to join your voice channel! I need `View Channels`, `Connect` and `Speak` permissions. [Permissions Example](https://cdn.discordapp.com/attachments/904438715974287440/909076558558412810/unknown.png)\n If the problem persists, change the voice channel region to `Europe`"); if (!e.member.voice.channel.speakable && "GUILD_STAGE_VOICE" !== e.member.voice.channel.type) return e.errorMessage("I don't have the permission to speak in your voice channel.\n Please give me the permission to or check this guide to learn how to give me this permissions:\nhttps://guide.green-bot.app/frequent-issues/permissions"); if (e.guildDB.vcs.length && !e.guildDB.vcs.includes(e.member.voice.channelId)) return e.errorMessage(e.guildDB.vcs.length > 1 ? `I am not allowed to play music in your voice channel. Please join one of the following channels: ${e.guildDB.vcs.map(e=>`<#${e}>`).join(",")}`:`I can only play music in the <#${e.guildDB.vcs[0]}> channel.`)}const n=e.client.shoukaku.getNode();return await e.client.queue.create(e,n)?e.successMessage(`Connected in <#${e.member.voice.channelId}>\n\n🆕 You can now manage the music easyly from the [Dashboard](https://dash.green-bot.app/app/${e.guild.id})`):e.errorMessage("I'm not able to join your voice channel right now! Please try again!")}}module.exports=Play;