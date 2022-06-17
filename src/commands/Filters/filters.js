const BaseCommand = require("../../abstract/BaseCommand.js");
class Skip extends BaseCommand {get name() { return "filters" }
    get description() { return "Shows all enabled filters" }get category() { return "Filters" }
    get aliases() { return ["filter", "list"] }get playerCheck() { return { voice: !0, dispatcher: !0, channel: !0 } }
    async run({ ctx: e }) { const s = e.dispatcher.player.filters;
        e.channel.send({ embeds: [{ author: { name: "Enabled filters", icon_url: e.client.user.displayAvatarURL({ dynamic: !0, size: 512 }) }, color: "#3A871F", description: `__• Music filters:__\nBassboost: ${e.dispatcher.filters.includes("bassboost")?"`Enabled`":"`Disabled`"} | Karaoke: ${e.dispatcher.filters.includes("karaoke")?"`Enabled`":"`Disabled`"} | Tremolo: ${s.tremolo?"`Enabled`":"`Disabled`"} | Vibrato: ${s.vibrato?"`Enabled`":"`Disabled`"}\n Distorsion: ${e.dispatcher.filters.includes("distorsion")?"`Enabled`":"`Disabled`"} | Rotation: ${s.rotation?"`Enabled`":"`Disabled`"} | Nightcore: ${e.dispatcher.filters.includes("nightcore")?"`Enabled`":"`Disabled`"} | Low pass: ${s.lowPass?"`Enabled`":"`Disabled`"} | 8d: ${e.dispatcher.filters.includes("8d")?"`Enabled`":"`Disabled`"}\n\n__• Other filters:__\nVolume: **${100*s.volume}** | Speed: **${s.timescale?s.timescale.speed:"1"}** | Pitch:  **${s.timescale?s.timescale.pitch:"0"}**`,footer:{text:"Green-bot | Free music for everyone!",icon_url:e.client.user.displayAvatarURL({dynamic:!0,size:512})}}]})}}module.exports=Skip;