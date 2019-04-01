import { v4 as uuid } from 'uuid'
import Interface from './interface'
import EventBase from './eventBase'
import * as R from 'ramda'
const jsPlumb = window.jsPlumb
export default class Node extends EventBase {
  /**
   * @param {object} params
   * @param {boolean} params.virtual
   * @param {Element} params.container
   * @param {string} [params.uuid]
   * @param {object} [params.endpointsUuid]
   * @param {string} [params.endpointsUuid.top]
   * @param {string} [params.endpointsUuid.bottom]
   * @param {Interface} params.interface
   * @param {String[]} [params.ancestors]
   * @param {String[]} [params.successors]
   * @param {string} [params.className]
   * @param {object} params.position
   * @param {number} params.position.x
   * @param {number} params.position.y
   */
  constructor(params) {
    super()

    this.uuid = params.uuid || `_${uuid()}`
    this.interface = params.interface || new Interface()
    /** @type {String[]} */
    this.ancestors = params.ancestors || []
    /** @type {String[]} */
    this.successors = params.successors || []
    this.endpointsUuid = params.endpointsUuid || {
      top: `_${uuid()}`,
      bottom: `_${uuid()}`,
    }
    this.container = params.container
    this.position = params.position
    this.className = params.className
    this.virtual = params.virtual

    const element = document.createElement('div')
    element.setAttribute('id', this.uuid)
    element.setAttribute('class', params.className)
    ;['contextmenu', 'click', 'dblclick', 'mouseup'].forEach(eventName => {
      element.addEventListener(eventName, e => this.emit(eventName, this, e))
    })
    this.element = element

    if (!params.virtual) {
      params.container.appendChild(element)
    }
    const { width, height } = element.getBoundingClientRect()
    element.style.left = `${params.position.x - width / 2}px`
    element.style.top = `${params.position.y - height / 2}px`

    // 设置锚点
    const isTarget = params.interface.input.length > 0
    const isSource = !!params.interface.output
    const defaultColor = '#456'
    const activeColor = '#1890ff'
    const common = {
      endpoint: 'Dot',
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
        'Flowchart',
        { gap: 6, cornerRadius: 5, alwaysRespectStubs: true },
      ],
      connectorOverlays: [
        [
          'Arrow',
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
    if (isTarget && !params.virtual) {
      jsPlumb.addEndpoint(
        element,
        {
          uuid: this.endpointsUuid.top,
          isTarget: true,
          isSource: false,
          anchor: 'Top',
          maxConnections: params.interface.input.length,
          parameters: {
            target: {
              node: this,
              type: params.interface.input,
              input: true,
              output: false,
            },
          },
        },
        // @ts-ignore
        common
      )
    }
    if (isSource && !params.virtual) {
      jsPlumb.addEndpoint(
        element,
        {
          uuid: this.endpointsUuid.bottom,
          isSource: true,
          isTarget: false,
          anchor: 'Bottom',
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

    if (!params.virtual) {
      jsPlumb.draggable(element)
    }
  }

  /**
   *
   * @param {Element | string} params
   */
  render(params) {
    if (typeof params === 'string') {
      this.element.innerHTML = params
    } else {
      this.element.innerHTML = ''
      this.element.append(params)
    }
    this.fixPosition(this.element)
  }

  /**
   *
   * @param {Element} element
   */
  fixPosition(element) {
    const { width, height } = element.getBoundingClientRect()
    element.style.left = `${this.position.x - width / 2}px`
    element.style.top = `${this.position.y - height / 2}px`
  }

  /**
   * @param {string} uuid
   */
  addAncestors(uuid) {
    if (!this.ancestors.includes(uuid)) {
      this.ancestors.push(uuid)
    }
  }

  /**
   * @param {string} uuid
   */
  removeAncestors(uuid) {
    this.ancestors = this.ancestors.filter(item => item !== uuid)
  }

  /**
   * @param {string} uuid
   */
  addSuccessors(uuid) {
    if (!this.successors.includes(uuid)) {
      this.successors.push(uuid)
    }
  }

  /**
   * @param {string} uuid
   */
  removeSuccessors(uuid) {
    this.successors = this.successors.filter(item => item !== uuid)
  }
}

Node.isSame = R.compose(
  R.apply(R.equals),
  R.map(R.prop('uuid')),
  R.unapply(R.identity)
)

/**
 * @param {Node} nodeSource
 * @param {Node} nodeTarget
 */
Node.addLink = (nodeSource, nodeTarget) => {
  nodeSource.addSuccessors(nodeTarget.uuid)
  nodeTarget.addAncestors(nodeSource.uuid)
}

/**
 * @param {Node} nodeSource
 * @param {Node} nodeTarget
 */
Node.removeLink = (nodeSource, nodeTarget) => {
  nodeSource.removeSuccessors(nodeTarget.uuid)
  nodeTarget.removeAncestors(nodeSource.uuid)
}
