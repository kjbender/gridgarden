const Test = require('./controllers/test')
const Transform = require('./controllers/transform')

module.exports = function(app) {
  app.get('/api/test', Test.testRoute); 
  app.post('/api/plot', Transform.transformPlot)
}
