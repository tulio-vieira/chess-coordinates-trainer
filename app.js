let express = require('express');
let app = express();
let path = require('path');
let port = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
  

// this line serves the css (static file) located in the public directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//index route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('*', function(req, res){
    res.status(404);
    res.send('404 not found');
});

app.listen(port, function() {
    console.log(`App listening on port ${port}!`);
});