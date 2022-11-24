const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const reportRoutes = require('./routes/report-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
var session = require('express-session')

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser)
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes.routes);
app.use(authRoutes.routes);
app.use(reportRoutes.routes);
app.use(userRoutes.routes);
app.use(adminRoutes.routes);

// io.on("connection", function(socket){
// socket.emit('check', 'helloooooo')
// })

server.listen(3000, () => console.log('App is listening on url http://localhost:3000'));