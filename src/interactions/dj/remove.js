const BaseCommand = require("../../abstract/BaseCommand.js");
class Volume extends BaseCommand {get name() { return "remove" }
    get description() { return "Remove a music from the queue" }get aliases() { return ["rem"] }
    get category() { return "Queue Management" }get arguments() { return [{ type: 3, name: "track", description: "The position or the track of the track you want to remove", required: !0 }] }
    get playerCheck() { return { voice: !0, dispatcher: !0, vote: false, channel: !0, dj: !0 } }
    run({ ctx: e }) { let r = e.args[0].value.replace("#", "") - 1; const t = e.dispatcher.queue[r]; if (!t) return e.errorMessage("There is no track with this number in your queue.");
        e.dispatcher.remove(r), e.successMessage(`Removed [${t.info.title}](${t.info.uri}) from the queue`) } }
module.exports = Volume;