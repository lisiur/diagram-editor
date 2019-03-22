import Node from "./node"
import Interface from "./interface"
import EventBase from "./eventBase"
import * as U from "./util"
const jsPlumb = window.jsPlumb
export default class Editor extends EventBase {
    /**
     *
     * @param {object} params
     * @param {string} params.container
     * @param {string} params.dragClass
     */
    constructor(params) {
        super()

        /** @type {Array.<HTMLElement>} */
        this.dragElements = []
        this.dragClass = params.dragClass

        /** @type {Array.<Node>} */
        this.nodes = []

        this.interfaces = {
            start: new Interface({
                input: [],
                output: "id",
            }),
            middle: new Interface({
                input: ["id"],
                output: "id",
            }),
            end: new Interface({
                input: ["id"],
                output: "",
            }),
        }

        jsPlumb.ready(() => {
            this.container = document.getElementById(params.container)
            this.init()
        })
    }
    init() {
        this.initDragElement()
        this.initJsplumb()
    }

    initDragElement() {
        this.dragElements = Array.from(
            document.querySelectorAll(`.${this.dragClass}`)
        )
        this.dragElements.forEach(el => {
            el.draggable = true
            el.addEventListener("dragstart", ev => {
                ev.dataTransfer.setData("text/plain", el.dataset.type)
            })
        })
        this.container.addEventListener("drop", e => {
            /** node interface */
            const type = e.dataTransfer.getData("text/plain")

            /** node position */
            const { layerX, layerY } = e

            this.addNode({
                interface: type,
                position: {
                    x: layerX,
                    y: layerY,
                },
            })
        })
        this.container.addEventListener("dragover", e => {
            e.preventDefault()
        })
    }

    initJsplumb() {
        jsPlumb.setContainer(this.container)
        jsPlumb.bind("connection", function(info) {
            const { connection } = info
            const { source, target } = connection.getParameters()

            /** @type {Node} */
            const sourceNode = source.node

            /** @type {Node} */
            const targetNode = target.node

            sourceNode.addSuccessors(targetNode.uuid)
            targetNode.addAncestors(sourceNode.uuid)
        })

        jsPlumb.bind("beforeDrop", function(info, _) {
            const [source] = info.connection.endpoints
            const target = info.dropEndpoint
            return U.notEq(
                U.pipe(
                    U.prop("source"),
                    U.prop("node")
                )(source.getParameters()),
                U.pipe(
                    U.prop("target"),
                    U.prop("node")
                )(target.getParameters())
            )
        })

        // disable default contextmenu
        this.container.addEventListener("contextmenu", e => e.preventDefault())
        jsPlumb.bind("contextmenu", function(component) {
            console.log(component)
        })
    }

    registerNodeEvent(node) {
        ;["contextmenu", "click", "dblclick"].forEach(eventName => {
            node.on(
                eventName,
                (params, event) => this.emit(eventName, params, event),
                this
            )
        })
    }
    /**
     *
     * @param {object} params
     * @param {string} params.interface
     * @param {object} params.position
     * @param {number} params.position.x
     * @param {number} params.position.y
     */
    addNode(params) {
        params = Object.assign(
            {
                interface: "middle",
                container: this.container,
            },
            params
        )
        const node = new Node({
            interface: this.interfaces[params.interface],
            container: this.container,
            className: "item",
            position: params.position || { x: 0, y: 0 },
        })
        this.nodes.push(node)
        this.registerNodeEvent(node)
        return node
    }
}
