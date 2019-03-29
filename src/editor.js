import Node from './node'
import Interface from './interface'
import EventBase from './eventBase'
import BPMN from './bpmn'
const jsPlumb = window.jsPlumb
export default class Editor extends EventBase {
  /**
     *
     * @param {object} params
     * @param {string} params.container
     * @param {string} params.dragClass
     */
  constructor (params) {
    super()

    /** @type {Array.<HTMLElement>} */
    this.dragElements = []
    this.dragClass = params.dragClass

    this.interfaces = {
      any: new Interface({
        name: 'any',
        input: ['any'],
        output: 'any'
      })
      // readTable: new Interface({
      //   name: 'readTable',
      //   input: [],
      //   output: 'id'
      // }),
      // sort: new Interface({
      //   name: 'sort',
      //   input: ['id'],
      //   output: 'id'
      // }),
      // filter: new Interface({
      //   name: 'filter',
      //   input: ['id'],
      //   output: 'id'
      // }),
      // write: new Interface({
      //   name: 'write',
      //   input: ['id'],
      //   output: ''
      // })
    }

    /** @type {Array.<Node>} */
    this.nodes = []
    this.startNode = this.addNode({
      uuid: 'start',
      virtual: true
    })
    this.endNode = this.addNode({
      uuid: 'end',
      virtual: true
    })

    jsPlumb.ready(() => {
      this.container = document.getElementById(params.container)
      this.init()
    })
  }
  init () {
    this.initDragElement()
    this.initJsplumb()
  }

  initDragElement () {
    this.dragElements = Array.from(
      document.querySelectorAll(`.${this.dragClass}`)
    )
    this.dragElements.forEach(el => {
      el.draggable = true
      el.addEventListener('dragstart', ev => {
        ev.dataTransfer.setData('text/plain', el.dataset.type)
      })
    })
    this.container.addEventListener('drop', e => {
      /** node interface */
      const type = e.dataTransfer.getData('text/plain')

      /** node position */
      const { layerX, layerY } = e

      const newNode = this.addNode({
        interface: type,
        position: {
          x: layerX,
          y: layerY
        }
      })
      Node.addLink(this.startNode, newNode)
      Node.addLink(newNode, this.endNode)
    })
    this.container.addEventListener('dragover', e => {
      e.preventDefault()
    })
  }

  initJsplumb () {
    const { startNode, endNode } = this
    jsPlumb.setContainer(this.container)

    // connection link event
    jsPlumb.bind('connection', function (info) {
      const { connection } = info
      const { source, target } = connection.getParameters()

      /** @type {Node} */
      const sourceNode = source.node

      /** @type {Node} */
      const targetNode = target.node

      // 切断目标节点和开始节点的链接
      Node.removeLink(startNode, targetNode)
      // 切断源节点节点和结束节点的链接
      Node.removeLink(sourceNode, endNode)
      // 添加源节点和目标节点的链接
      Node.addLink(sourceNode, targetNode)
    })

    // connection before link event
    jsPlumb.bind('beforeDrop', function (info, _) {
      const [source] = info.connection.endpoints
      const target = info.dropEndpoint
      return source.getParameters().source.node !== target.getParameters().target.node
    })

    // disable default contextmenu
    this.container.addEventListener('contextmenu', e => e.preventDefault())
    jsPlumb.bind('contextmenu', function (component) {
      console.log(component)
    })
  }

  /**
   *
   * @param {Node} node
   */
  registerNodeEvent (node) {
    ;['contextmenu', 'click', 'dblclick'].forEach(eventName => {
      node.on(
        eventName,
        (params, event) => this.emit(eventName, params, event),
        this
      )
    })
    node.on('mouseup',
    /**
     * @param {Node} target
     * @param {MouseEvent} event
     */
      (target, event) => {
        const { layerX, layerY } = event
        target.position = {
          x: layerX,
          y: layerY
        }
      })
  }
  /**
     *
     * @param {object} params
     * @param {boolean} [params.virtual]
     * @param {string} [params.uuid]
     * @param {string} [params.interface]
     * @param {String[]} [params.ancestors]
     * @param {String[]} [params.successors]
     * @param {object} [params.position]
     * @param {number} params.position.x
     * @param {number} params.position.y
     */
  addNode (params) {
    params = Object.assign(
      {
        interface: 'any',
        container: this.container,
        ancestors: [],
        successors: [],
        position: { x: 0, y: 0 }
      },
      params
    )
    const node = new Node({
      interface: this.interfaces[params.interface],
      container: this.container,
      className: 'item',
      ancestors: params.ancestors,
      successors: params.successors,
      position: params.position,
      uuid: params.uuid,
      virtual: params.virtual
    })
    this.nodes.push(node)
    this.registerNodeEvent(node)
    if (!['start', 'end'].includes(node.uuid)) {
      Node.addLink(this.startNode, node)
      Node.addLink(node, this.endNode)
    }
    return node
  }

  /**
   *
   * @param {Interface} interfaceDef
   */
  registerInterface (interfaceDef) {
    this.interfaces[interfaceDef.name] = interfaceDef
  }

  /**
   *
   * @param {Interface[]} interfaceDefs
   */
  registerInterfaces (interfaceDefs) {
    interfaceDefs.forEach(this.registerInterface)
  }

  toBPMNXml () {
    return new BPMN({ nodes: this.nodes, startNode: this.startNode }).toXML()
  }
}
