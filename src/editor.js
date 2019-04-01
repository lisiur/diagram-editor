import { v4 as uuid } from 'uuid'
import Node from './node'
import Interface from './interface'
import EventBase from './eventBase'
import BPMN from './bpmn'
const jsPlumb = window.jsPlumb
export default class Editor extends EventBase {
  /**
   *
   * @param {object} params
   * @param {string|Element} params.container
   * @param {string} params.dragClass
   * @param {string} [params.nodePrefix]
   */
  constructor(params) {
    super()

    this.processId = `_${uuid()}`
    /** @type {Array.<HTMLElement>} */
    this.dragElements = []
    /** 可拖拽的元素class */
    this.dragClass = params.dragClass
    /** 自定义不同节点渲染的类名前缀 */
    this.nodePrefix = params.nodePrefix || 'interface-'

    this.interfaces = {
      any: new Interface({
        name: 'any',
        input: ['any'],
        output: 'any',
      }),
    }

    /** @type {Array.<Node>} */
    this.nodes = []
    this.startNode = this.addNode({
      uuid: 'start',
      virtual: true,
    })
    this.endNode = this.addNode({
      uuid: 'end',
      virtual: true,
    })

    jsPlumb.ready(() => {
      if (typeof params.container === 'string') {
        this.container = document.getElementById(params.container)
      } else {
        this.container = params.container
      }
      this.init()
    })
  }
  init() {
    this.initDragElement()
    this.initJsplumb()
    this.emit('ready')
  }

  initDragElement() {
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
          y: layerY,
        },
      })
      Node.addLink(this.startNode, newNode)
      Node.addLink(newNode, this.endNode)
      this.emit('add-node', newNode)
    })
    this.container.addEventListener('dragover', e => {
      e.preventDefault()
    })
  }

  initJsplumb() {
    const { startNode, endNode } = this
    jsPlumb.setContainer(this.container)

    // connection link event
    jsPlumb.bind('connection', function(info) {
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
    jsPlumb.bind('beforeDrop', function(info, _) {
      const [source] = info.connection.endpoints
      const target = info.dropEndpoint
      return (
        source.getParameters().source.node !==
        target.getParameters().target.node
      )
    })

    // disable default contextmenu
    this.container.addEventListener('contextmenu', e => e.preventDefault())
    jsPlumb.bind('contextmenu', function(component) {
      console.log(component)
    })
  }

  /**
   *
   * @param {Node} node
   */
  registerNodeEvent(node) {
    ;['contextmenu', 'click', 'dblclick'].forEach(eventName => {
      node.on(
        eventName,
        (params, event) => this.emit(eventName, params, event),
        this
      )
    })
    node.on(
      'mouseup',
      /**
       * @param {Node} target
       * @param {MouseEvent} event
       */
      (target, event) => {
        const { left: leftPx, top: topPx } = target.element.style
        const left = parseFloat(leftPx)
        const top = parseFloat(topPx)
        const { width, height } = target.element.getBoundingClientRect()
        target.position = {
          x: left + width / 2,
          y: top + height / 2,
        }
      }
    )
  }
  /**
   *
   * @param {import('../typings').addNodeParams} params
   */
  addNode(params) {
    params = Object.assign(
      {
        interface: 'any',
        container: this.container,
        ancestors: [],
        successors: [],
        position: { x: 0, y: 0 },
      },
      params
    )
    const node = new Node({
      interface: this.interfaces[params.interface],
      container: this.container,
      className: params.className || `${this.nodePrefix}${params.interface}`,
      ancestors: params.ancestors,
      successors: params.successors,
      position: params.position,
      uuid: params.uuid,
      virtual: params.virtual,
      endpointsUuid: params.endpointsUuid,
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
  registerInterface(interfaceDef) {
    this.interfaces[interfaceDef.name] = interfaceDef
  }

  /**
   *
   * @param {Interface[]} interfaceDefs
   */
  registerInterfaces(interfaceDefs) {
    interfaceDefs.forEach(this.registerInterface.bind(this))
  }

  toBPMNXml() {
    return new BPMN({ nodes: this.nodes, startNode: this.startNode }).toXML()
  }

  /**
   * @typedef {object} Process
   * @property {string} process.processId
   * @property {Array.<import('../typings').addNodeParams>} process.processNodes
   * @property {Array.<[string, string]>} process.connections
   */
  /**
   * @returns {Process}
   */
  toJson() {
    const processId = this.processId
    const connections = []
    const processNodes = []
    this.nodes.forEach(node => {
      processNodes.push({
        className: node.className,
        interface: node.interface.name,
        uuid: node.uuid,
        virtual: node.virtual,
        position: node.position,
        ancestors: node.ancestors,
        successors: node.successors,
        endpointsUuid: node.endpointsUuid,
      })
      const sourceUuid = node.endpointsUuid.bottom
      node.successors.forEach(uuid => {
        const targetNode = this.nodes.find(it => it.uuid === uuid)
        const targetUuid = targetNode.endpointsUuid.top
        connections.push([sourceUuid, targetUuid])
      })
    })
    return {
      processId,
      processNodes,
      connections,
    }
  }

  /**
   *
   * @param {Process} json
   */
  load(json) {
    const { processId, processNodes, connections } = json
    this.processId = processId
    const userNodes = processNodes.filter(node => !node.virtual)
    const startNodeParams = processNodes.find(node => node.uuid === 'start')
    const endNodeParams = processNodes.find(node => node.uuid === 'end')
    this.startNode.successors = startNodeParams.successors
    this.endNode.ancestors = endNodeParams.ancestors
    userNodes.forEach(params => {
      this.addNode(params)
    })
    connections.forEach(([sourceUuid, targetUuid]) => {
      jsPlumb.connect({ uuids: [sourceUuid, targetUuid] })
    })
  }
}
