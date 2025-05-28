const noRestrictedImportsRules = require('./noRestrictedImportsRules')
const recommended = require('./recommended')
const react = require('./react')
const prettier = require('./prettier')

module.exports = {
  noRestrictedImportsRules,
  configs: {
    get all() {
      return [...recommended(), ...react(), ...prettier()]
    },
    get recommended() {
      return recommended()
    },
    get react() {
      return react()
    },
    get prettier() {
      return prettier()
    },
  },
}
