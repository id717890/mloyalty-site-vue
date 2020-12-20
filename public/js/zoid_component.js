window.MloyaltyWidget = zoid.create({

  // The html tag used to render my component

  tag: 'mloyalty-widget',

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  url: 'http://localhost:8080/',
  
  dimensions: {
    height: '100%'
  },
  
  props: {
    testProp: {
	  type: 'string',
	    required: false
    }
  }
});