var app = require('./server-config.js');

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function(){
  console.log('Server listening on port', app.get('port'));
});

module.exports = app;
