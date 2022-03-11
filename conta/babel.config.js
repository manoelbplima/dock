module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@entities': './src/entities',
          "@repositories": "./src/repositories",
          "@providers": "./src/providers",
          "@adapters": "src/adapter",
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }