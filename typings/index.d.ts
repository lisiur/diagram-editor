namespace Editor {
  interface addNodeParams {
    uuid?: string
    interface?: string
    ancestors?: [string]
    successors?: [string]
    position?: { x: number; y: number }
  }
  class Node {
  }
  class Editor {
    constructor({ container: string, dragClass: string })
    addNode(params: addNodeParams): Node
    toBPMNXml(): string
  }
}
export = Editor
export as namespace Editor
