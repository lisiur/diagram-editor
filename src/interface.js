/**
 * @typedef {object} Type
 * @property {string} name
 * @property {boolean} required
 */

/**
 * @type {Array.<Type>}
 */
const TYPES = [
  {
    name: 'id',
    required: false
  }
]
export default class Interface {
  /**
     *
     * @param {object} [params]
     * @param {string[]} params.name
     * @param {string[]} params.input
     * @param {string} params.output
     */
  constructor (params) {
    const newParams = Object.assign(
      {
        name: 'any',
        input: ['id'],
        output: 'id'
      },
      params
    )
    this.name = newParams.name
    this.input = newParams.input
    this.output = newParams.output
  }

  getInputTypes () {
    return this.input.map(input => TYPES.find(it => it.name === input))
  }

  getOutputType () {
    return TYPES.find(it => it.name === this.output)
  }

  /**
     * @param {string[]} input
     */
  setInput (input) {
    this.input = input
  }

  /**
     * @param {string} output
     */
  setOutput (output) {
    this.output = output
  }
}
Interface.defineType =
    /**
     * @param {Type} type
     */
    function (type) {
      let oldIndex = TYPES.findIndex(it => Interface.isSameType(type, it))
      if (oldIndex !== -1) {
        console.warn(`类型[${type.name}]被覆盖`)
        TYPES.splice(oldIndex, 1)
      }
      TYPES.push(type)
    }

Interface.validate =
    /**
     * @param {Type} output
     * @param {Type} input
     */
    function (output, input) {
      return output.name === input.name
    }

Interface.isSameType =
    /**
     *
     * @param {Type} type1
     * @param {Type} type2
     */
    function (type1, type2) {
      return type1.name === type2.name
    }
