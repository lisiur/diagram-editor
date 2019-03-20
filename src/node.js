import { v1 as uuid } from "uuid"
import Interface from "./interface"
import EventBase from "./eventBase"
const jsPlumb = window.jsPlumb
export default class Node extends EventBase {
    /**
     * @param {object} params
     * @param {Interface} params.interface
     * @param {Node[]} params.ancestors
     * @param {Node[]} params.successors
     * @param {Element} params.container
     * @param {string} [params.className]
     * @param {object} [params.parameters]
     * @param {object} [params.parameters]
     */
    constructor(params) {
        super()

        this.uuid = uuid()
        this.container = params.container

        const element = document.createElement("div")
        element.setAttribute("id", this.uuid)
        element.setAttribute("class", params.className)
        ;["contextmenu", "click", "dblclick"].forEach(eventName => {
            element.addEventListener(eventName, e =>
                this.emit(eventName, this, e)
            )
        })
        params.container.appendChild(element)

        this.interface = params.interface || new Interface()
        this.ancestors = params.ancestors || []
        this.successors = params.successors || []

        const isTarget = params.interface.input.length > 0
        const isSource = !!params.interface.output
        const defaultColor = "#456"
        const activeColor = "#1890ff"
        const common = {
            endpoint: "Dot",
            paintStyle: {
                fill: defaultColor,
                strokeStyle: defaultColor,
                radius: 6,
            },
            hoverPaintStyle: {
                fill: activeColor,
                strokeStyle: activeColor,
            },
            connectorStyle: {
                outlineStroke: defaultColor,
                strokeStyle: defaultColor,
                strokeWidth: 0.5,
            },
            connectorHoverStyle: {
                outlineStroke: activeColor,
                strokeStyle: activeColor,
                strokeWidth: 1,
            },
            connector: [
                "Flowchart",
                { gap: 6, cornerRadius: 5, alwaysRespectStubs: true },
            ],
            connectorOverlays: [
                [
                    "Arrow",
                    {
                        width: 12,
                        length: 12,
                        location: 1,
                        paintStyle: {
                            fill: defaultColor,
                        },
                    },
                ],
            ],
        }
        if (isTarget) {
            params.interface.input.forEach(type => {
                jsPlumb.addEndpoint(
                    element,
                    {
                        isTarget: true,
                        isSource: false,
                        anchor: "Top",
                        maxConnections: -1,
                        parameters: {
                            target: {
                                node: this,
                                type,
                                input: true,
                                output: false,
                            },
                        },
                    },
                    // @ts-ignore
                    common
                )
            })
        }
        if (isSource) {
            jsPlumb.addEndpoint(
                element,
                {
                    isSource: true,
                    isTarget: false,
                    anchor: "Bottom",
                    maxConnections: -1,
                    parameters: {
                        source: {
                            node: this,
                            type: params.interface.output,
                            input: false,
                            output: true,
                        },
                    },
                },
                // @ts-ignore
                common
            )
        }
        jsPlumb.draggable(element)
    }
}
