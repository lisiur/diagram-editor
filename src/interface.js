export default class Interface {
  /**
   *
   * @param {object} [params]
   * @param {string[]} params.name
   * @param {string[]} params.input
   * @param {string} params.output
   */
  constructor(params) {
    this.name = params.name
    this.input = params.input
    this.output = params.output
  }

  /**
   * @param {string[]} input
   */
  setInput(input) {
    this.input = input
  }

  /**
   * @param {string} output
   */
  setOutput(output) {
    this.output = output
  }
}

Interface.validate =
  /**
   * @param {Interface} source
   * @param {Interface} target
   */
  function(source, target) {
    return target.input.includes(source.output)
  }

Interface.isSameType =
  /**
   *
   * @param {Type} type1
   * @param {Type} type2
   */
  function(type1, type2) {
    return type1.name === type2.name
  }
