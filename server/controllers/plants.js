var shortid = require("shortid");

// const onion = require('../client/src/icons/onion.svg');
// const corn = require('../client/src/icons/corn.svg');
// const carrot = require('../client/src/icons/carrot.svg');
// const tomato = require('../client/src/icons/tomato.svg');
// const beans = require('../client/src/icons/beans.svg');

const PLANTS = {
  0: { id: shortid.generate(), name: '', matrixIndex: 0, icon: '' },
  1: { id: shortid.generate(), name: 'Tomato', matrixIndex: 1, icon: 'tomato' },
  2: { id: shortid.generate(), name: 'Corn', matrixIndex: 2, icon: 'corn' },
  3: { id: shortid.generate(), name: 'Beans', matrixIndex: 3, icon: 'beans' },
  4: { id: shortid.generate(), name: 'Onion', matrixIndex: 4, icon: 'onion' },
  5: { id: shortid.generate(), name: 'Carrot', matrixIndex: 5, icon: 'carrot' }
};
// tomato, corn, beans, onion, carrot, broccoli, chili, eggplant, peas, pepper, radish, garlic, pumpkin, lettuce, potato, red onion, cucumber, cauliflower, asparagus, kale, chives
const newPLANTS = {
  "0": { "name": "", "matrixIndex": 0, "id": shortid.generate() },
  "1": { "name": "tomato", "matrixIndex": 1, "id": shortid.generate() },
  "2": { "name": "corn", "matrixIndex": 2, "id": shortid.generate() },
  "3": { "name": "beans", "matrixIndex": 3, "id": shortid.generate() },
  "4": { "name": "onion", "matrixIndex": 4, "id": shortid.generate() },
  "5": { "name": "carrot", "matrixIndex": 5, "id": shortid.generate() },
  "6": { "name": "broccoli", "matrixIndex": 6, "id": shortid.generate() },
  "7": { "name": "chili", "matrixIndex": 7, "id": shortid.generate() },
  "8": { "name": "eggplant", "matrixIndex": 8, "id": shortid.generate() },
  "9": { "name": "peas", "matrixIndex": 9, "id": shortid.generate() },
  "10": { "name": "pepper", "matrixIndex": 10, "id": shortid.generate() },
  "11": { "name": "radish", "matrixIndex": 11, "id": shortid.generate() },
  "12": { "name": "garlic", "matrixIndex": 12, "id": shortid.generate() },
  "13": { "name": "pumpkin", "matrixIndex": 13, "id": shortid.generate() },
  "14": { "name": "lettuce", "matrixIndex": 14, "id": shortid.generate() },
  "15": { "name": "potato", "matrixIndex": 15, "id": shortid.generate() },
  "16": { "name": "red onion", "matrixIndex": 16, "id": shortid.generate() },
  "17": { "name": "cucumber", "matrixIndex": 17, "id": shortid.generate() },
  "18": { "name": "cauliflower", "matrixIndex": 18, "id": shortid.generate() },
  "19": { "name": "asparagus", "matrixIndex": 19, "id": shortid.generate() },
  "20": { "name": "kale", "matrixIndex": 20, "id": shortid.generate() },
  "21": { "name": "chives", "matrixIndex": 21, "id": shortid.generate() }
}

exports.getPlants = function (req, res) {
  let plants = PLANTS;
  res.send({ plants })
}
