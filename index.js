const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const conn = require('express-myconnection');
const mysql = require('mysql');

const myecommerce = require('./routes/myecommerce');

app.set('port', process.env.port || 3000);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(
    conn(mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'ecommerce'
    }, 'single')
);

app.get('/', function(req, res){
    res.send('Server is running on port ' + app.get('port') + '!');
});

app.get('/ecommerce', myecommerce.home);
app.get('/ecommerce/products/:id_product', myecommerce.products);

app.listen(app.get('port'), function(){
    console.log('Server is running on port ' + app.get('port') + '!');
});