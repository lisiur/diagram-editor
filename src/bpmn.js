import * as xml2js from 'xml2js'
import Node from './node'
const builder = new xml2js.Builder()
const parseString = xml2js.parseString

export default class BPMN {
  /**
   *
   * @param {object} param
   * @param {Node} param.startNode
   * @param {Node[]} param.nodes
   * @param {string} param.xml
   */
  constructor(params = { nodes: [], startNode: null, xml: '' }) {
    this.nodes = params.nodes
    this.startNode = params.startNode
    this.xml = params.xml
  }
  toXML() {
    /**
     * @type {import("../global").BPMN}
     */
    const xmlDef = {
      definitions: {
        $: {
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://schema.omg.org/spec/BPMN/2.0 BPMN20.xsd',
          xmlns: 'http://www.omg.org/spec/BPMN/20100524/MODEL',
          typeLanguage: 'http://www.w3.org/2001/XMLSchema',
          expressionLanguage: 'http://www.w3.org/1999/XPath',
          targetNamespace: 'http://jbpm.org/example/bpmn2',
        },
        process: [
          {
            $: {
              id: '',
            },
            startEvent: [
              {
                $: {
                  id: 'start',
                },
              },
            ],
            endEvent: [
              {
                $: {
                  id: 'end',
                },
              },
            ],
            userTask: [],
            sequenceFlow: [],
          },
        ],
      },
    }
    this.configXmlDef(xmlDef, this.startNode)
    return builder.buildObject(xmlDef)
  }

  /**
   * @returns {Promise.<Array.<import('../typings').addNodeParams>>}
   */
  toNodesParams() {
    return new Promise((resolve, reject) => {
      parseString(this.xml, (err, result) => {
        if (err) {
          throw err
        }
        const nodes = result.definitions.diagram[0].node.map(it => it['$'])
        const params = nodes.map(node => {
          const {
            uuid,
            interface: interfaceStr,
            className,
            position: positionStr,
            ancestors: ancestorsStr,
            successors: successorsStr,
          } = node
          const [x, y] = positionStr.split(',')
          const ancestors = ancestorsStr.split(',')
          const successors = successorsStr.split(',')
          return {
            uuid,
            interface: interfaceStr,
            position: {
              x,
              y,
            },
            ancestors,
            successors,
            className,
          }
        })
        resolve(params)
      })
    })
  }

  /**
   *
   * @param {import("../global").BPMN} xmlDef
   * @param {Node} node
   */
  configXmlDef(xmlDef, node) {
    const successors = node.successors.map(uuid =>
      this.findNodeByUuid(this.nodes, uuid)
    )
    successors.forEach(n => {
      xmlDef.definitions.process[0].sequenceFlow.push({
        $: {
          id: `${node.uuid}.${n.uuid}`,
          name: '',
          sourceRef: node.uuid,
          targetRef: n.uuid,
        },
      })
      if (n.uuid === 'end') {
        return
      }
      xmlDef.definitions.process[0].userTask.push({
        $: {
          id: n.uuid,
        },
      })
      // xmlDef.definitions.diagram[0].node.push({
      //   $: {
      //     className: n.className,
      //     interface: n.interface.name,
      //     uuid: n.uuid,
      //     virtual: !!n.virtual,
      //     position: `${n.position.x},${n.position.y}`,
      //     ancestors: n.ancestors.join(','),
      //     successors: n.successors.join(','),
      //   },
      // })
      this.configXmlDef(xmlDef, n)
    })
  }

  /**
   *
   * @param {string} uuid
   * @returns {Node}
   */
  findNodeByUuid(nodes, uuid) {
    return nodes.find(node => node.uuid === uuid)
  }
}
