const http = require('http');
const url = require('node:url');
const list = [{ name: "water", price: 1, avilable: false }]

const winston = require('winston');
const logger = winston.createLogger({

    transports: [
        new winston.transports.Console()
    ]
});
const server = http.createServer((req, res) => {
    //Let the user via PostMan, make a request to add an item: 
    if (req.method === 'GET' && req.url === '/listTracker') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        logger.info(`get request made was sent`)
        res.end(JSON.stringify(list));

    } else if (req.method === 'POST' && req.url === '/listTracker') {
        //code here to execute to parse the data and then just add it to the arrary and send back the arrary
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        //the end part is when we recive all of the data correct 
        req.on('end', () => {
            const data = JSON.parse(body);
            list.push(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            logger.info(`post request made and data was`)
            res.end(JSON.stringify(list));
        })

    } else if (req.method === 'DELETE') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const permaDeleteObject = list.find(obj => obj.name === data.name);
            const index = list.indexOf(permaDeleteObject);
            list.splice(index, 1);
            logger.info(`delete request made and data was`)
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(list));
        })

        //query strings come in format of ? after url and in key value pairs
        console.log(); // Log the parsed query string to the console (for debugging).


    } else if (req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const objectToUpdate = list.find(obj => obj.name === data.name);
            const index = list.indexOf(objectToUpdate);
            list.splice(index, 1, data);
            logger.info(`put request made and data was`)
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(list));
        })
    }
});



server.listen(8080, () => {

    logger.info(`Server is listening on http://localhost: 8080`)
})