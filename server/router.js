const Test = require('./controllers/test')
const Transform = require('./controllers/transform')
const Plants = require('./controllers/plants')

module.exports = function(app) {
  app.get('/api/test', Test.testRoute); 
  app.get('/api/plants', Plants.getPlants); 
  app.post('/api/plot', Transform.transformPlot); 
}
