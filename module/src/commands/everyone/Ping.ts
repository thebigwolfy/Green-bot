import { Command } from "../../abstract/QuickCommand";
export default class Volume extends Command {
    get name() {
        return "ping";
    }
    get category() {
        return "Everyone Commands";
    }
    get description() {
        return "Basic ping command!";
    }
    run({ ctx: e }) {
        const b = Date.now()
        e.send("**Pinging...**").then((n) => {
            n.edit({
                embeds: [
                    {
                        author: { name: "Bot latency", icon_url: e.member.user.dynamicAvatarURL() },
                        description: `**Message ping**: \`${Date.now() -b}ms\``,
                        color: 0x3a871f,
                        footer: { text: "• Get more informations on the status channel of support server", icon_url: e.client.user.dynamicAvatarURL() },
                    },
                ],
                content: ""
            });
        });
    }
}
