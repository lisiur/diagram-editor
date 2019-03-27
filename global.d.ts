import { jsPlumbInstance } from './jsplumb'
declare global {
  interface Window {
    jsPlumb: jsPlumbInstance
  }
}

declare interface BPMN {
  definitions: {
    $: {
      id: string
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
      'xsi:schemaLocation': 'http://schema.omg.org/spec/BPMN/2.0 BPMN20.xsd'
      xmlns: 'http://schema.omg.org/spec/BPMN/2.0'
      typeLanguage: 'http://www.w3.org/2001/XMLSchema'
      expressionLanguage: 'http://www.w3.org/1999/XPath'
      targetNamespace: 'http://jbpm.org/example/bpmn2'
    }
    process: Array<{
      $: {
        id: string
        name: string
      }
      sequenceFlow: Array<{
        $: {
          id: string
          name: string
          sourceRef: string
          targetRef: string
        }
      }>
      userTask: Array<{
        $: {
          id: string
          name: string
        }
      }>
      startEvent: Array<{
        $: {
          id: string
          name: string
        }
      }>
      endEvent: Array<{
        $: {
          id: string
          name: string
        }
        terminateEventDefinition: boolean
      }>
    }>
    diagram: Array<{
      node: Array<{
        $: {
          uuid: string
          virtual: boolean
          interface: string
          className: string
          position: string
          ancestors: string
          successors: string
        }
      }>
    }>
  }
}
