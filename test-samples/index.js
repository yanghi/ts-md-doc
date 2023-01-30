const path = require('path');
const { createGenerator } = require('../dist/index')

createGenerator({
  path: path.resolve('./input.d.ts')
})
  .generate()