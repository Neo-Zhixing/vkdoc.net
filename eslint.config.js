// eslint.config.js
import antfu from '@antfu/eslint-config'

export default await antfu({}, {
  rules: {
    'node/prefer-global/process': ['error', 'always'],
    'curly': ['error', 'all'],
  },
})
