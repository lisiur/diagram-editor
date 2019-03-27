export default class EventBase {
  constructor () {
    /** @type {Object.<string, Array.<{handler: function, context: any}>>} */
    this.eventHandler = {}
  }

  /**
     * @param {string} event
     * @param {function} handler
     * @param {object} context
     */
  on (event, handler, context) {
    ;(this.eventHandler[event] || (this.eventHandler[event] = [])).push({
      handler,
      context
    })
  }

  /**
     * @param {string} event
     * @param {*} params
     * @param {Event} originalEvent
     */
  emit (event, params, originalEvent) {
    const handlers = this.eventHandler[event] || []
    handlers.forEach(({ handler, context }) => {
      handler.call(context, params, originalEvent)
    })
  }
}
