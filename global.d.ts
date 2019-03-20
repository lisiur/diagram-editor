import { jsPlumbInstance } from "./jsplumb"
declare global {
    interface Window {
        jsPlumb: jsPlumbInstance
    }
}
