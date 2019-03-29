namespace Editor {
  interface addNodeParams {
    uuid?: string
    interface?: string
    ancestors?: [string]
    successors?: [string]
    position?: { x: number; y: number }
  }
  interface InterfaceParams {
    name: string
    input: [string]
    output: string
  }
  class Node {}
  class Editor {
    constructor({ container: string, dragClass: string })
    addNode(params: addNodeParams): Node
    registerInterface(params: InterfaceParams): void
    registerInterfaces(params: [InterfaceParams]): void
    toBPMNXml(): string
  }
}
export = Editor
export as namespace Editor
