import Node from "./node"
import Interface from "./interface"
import EventBase from "./eventBase"
const jsPlumb = window.jsPlumb
export default class Editor extends EventBase {
    constructor(params) {
        super()

        /** @type {Array.<Node>} */
        this.nodes = []

        jsPlumb.ready(() => {
            this.container = document.getElementById(params.container)
            this.init()
        })
    }
    init() {
        // NOTE: disable default contextmenu
        this.container.addEventListener("contextmenu", e => e.preventDefault())
        jsPlumb.setContainer(this.container)
        jsPlumb.bind("beforeDrop", function(info, _) {
            const [source] = info.connection.endpoints
            const target = info.dropEndpoint
            if (
                source.getParameters()["source"]["node"] ===
                target.getParameters()["target"]["node"]
            ) {
                return false
            }
            return true
        })
        jsPlumb.bind("contextmenu", function(component) {
            console.log(component)
        })
    }
    addNode() {
        const node = new Node({
            interface: new Interface({
                input: ["id"],
                output: "id",
            }),
            ancestors: [],
            successors: [],
            container: this.container,
            className: "item",
        })
        this.nodes.push(node)
        ;["contextmenu", "click", "dblclick"].forEach(eventName => {
            node.on(
                eventName,
                (params, event) => this.emit(eventName, params, event),
                this
            )
        })
    }
}
