const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const server = http.createServer(app);
let data = require('./views/data.json');
const jsonfile = require('jsonfile');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.put('/edit/:id', function(req, res) {
    var id = req.params.id;
    var newText = req.body.text;

    jsonfile.readFile('./views/data.json', function(err, obj) {
      var fileObj = obj;
      
      fileObj[id].text = newText;

      jsonfile.writeFile('./views/data.json', fileObj, function(err) {
          if (err) throw err;
      });
    });
	res.json('Все нормально братанчик')
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});
app.set('view engine', 'pug')

app.use(express.static("views"));

app.get('/', function (request, response) {
	response.render('nonavt', {
		data:data,
	})
  })

app.use('/dashboard', function (request, res) {
	res.render('dashboard', {
		data:data,
	})
})

app.use('/vxod', function (request, response) {
	response.render('vxod', {
	})
  })

app.use('/reg', function (request, response) {
	response.render('reg', {
	})
  })

// самому поменятm
//Go the SERVERs
server.listen(3000)
