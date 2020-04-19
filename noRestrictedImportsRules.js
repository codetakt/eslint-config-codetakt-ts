module.exports = {
  patterns: ['lodash/*'],
  paths: [
    {
      // Importing * as _, _.chain(), _.noConflict() will mark all methods as used.
      // Sadly this will prevent webpack from tree shaking and you'll get bloated bundle.
      // https://github.com/lodash/lodash/issues/3298#issuecomment-319978917
      name: 'lodash',
      importNames: ['default', 'chain', 'noConflict'],
      message: 'Import only necessary methods to keep bundle size small with tree shaking.'
    }
  ]
}
