const withSerwist = require('@serwist/next').default({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV !== 'production',
})

module.exports = withSerwist({
  sassOptions: {
    prependData: `
        @import 'styles/variables';
        @import 'styles/media-queries';
        @import 'styles/rem';
      `,
  },
})
