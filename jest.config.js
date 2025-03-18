const baseConfig = require('@adhamu/zero/jest')

module.exports = {
  ...baseConfig,
  transform: { '^.+\\.ts(x)?$': '@swc/jest' },
}
