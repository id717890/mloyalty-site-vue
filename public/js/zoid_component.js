window.MloyaltyWidget = zoid.create({
  // The html tag used to render my component

  tag: 'mloyalty-widget',

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  // url: 'http://localhost:8081/',
  url: 'http://vidget.lctest.ru/',

  dimensions: {
    height: '100%',
    width: '100%'
  },

  props: {
    code: {
      type: 'string',
      required: true
    },
    isMobile: {
      type: 'boolean',
      required: false
    }
  }
})
