var shortid = require("shortid");

// const onion = require('../client/src/icons/onion.svg');
// const corn = require('../client/src/icons/corn.svg');
// const carrot = require('../client/src/icons/carrot.svg');
// const tomato = require('../client/src/icons/tomato.svg');
// const beans = require('../client/src/icons/beans.svg');

const PLANTS = {
  0: { id: shortid.generate(), name: '', matrixIndex: 0, icon: '' },
  1: { id: shortid.generate(), name: 'Tomatoes', matrixIndex: 1, icon: 'tomato' },
  2: { id: shortid.generate(), name: 'Corn', matrixIndex: 2, icon: 'corn' },
  3: { id: shortid.generate(), name: 'Beans', matrixIndex: 3, icon: 'beans' },
  4: { id: shortid.generate(), name: 'Onion', matrixIndex: 4, icon: 'onion' },
  5: { id: shortid.generate(), name: 'Carrots', matrixIndex: 5, icon: 'carrot' }
}; 

exports.getPlants = function(req, res) {
  let plants = PLANTS; 
  res.send({ plants })
}
