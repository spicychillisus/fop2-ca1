const express = require('express');
const path    = require('path');
const util    = require('util');
const fs      = require('fs');
const app     = express();
const parse   = require("csv-parse").parse;

let data2023;

app.use(express.json());

// display basic information from request 
app.use((req, res, next) => {
   console.log(`requesting: ${req.url}`);
   console.log(`method: ${req.method}`);
   console.log(`path: ${req.path}`);
   console.log('Body Object');
   console.log(util.inspect(req.body, { depth: null }));
   next();
});

// read data from csv file 
function readAllData() {
   return new Promise((resolve, reject) => {
      const rData = [];
      fs.createReadStream(".\\data\\Credit Card Transactions.csv")
         .pipe(parse({ delimiter: ',', from_line: 2 }))
          .on('data', function (csvrow) {
              let newRecord = {
                  transaction_date_time: csvrow[0],
                  credit_card_number: csvrow[1],
                  merchant_name: csvrow[2],
                  category: csvrow[3],
                  transaction_amount: csvrow[4],
                  first_name: csvrow[5],
                  last_name: csvrow[6],
                  gender: csvrow[7],
                  street: csvrow[8],
                  city: csvrow[9],
                  state: csvrow[10],
                  zip: csvrow[11],
                  city_population: csvrow[12],
                  job: csvrow[13],
                  date_of_birth: csvrow[14],
              }
              rData.push(newRecord);
          })
         .on('end', function () {
            resolve(rData)
         })
         .on('error', function (err) {
            reject(err);
         });
   });
}

// API ENDPOINTS
// This responds with " Nothing" on the homepage
app.get('/', function (req, res) {
   console.log("Host data ready");
   res.send('Your Data Host!');
})

// all records
app.get('/allcreditcarddata', (req, res) => {   
   res.status(200);
   res.type('application/json');
   res.json(data2023);   
});

// get records of merchants via query string, e.g. http://localhost:8081/merchant?name=Kub
app.get('/merchant', (req, res) => {
    let merchantName = req.query.name == undefined ? "notFound" : req.query.name;
    const result = data2023.filter((data) => { return data.merchant_name.indexOf(merchantName) != -1})
    res.status(200);
    res.type('application/json');
    res.json(result);   
 });
 
// get records via merchants by parameter, e.g. http://localhost:8081/merchant/name/Kub%20and
app.get('/merchant/name/:name', (req, res) => {
    let merchantName = req.params.name
    const result = data2023.filter((data) => { return data.merchant_name.indexOf(merchantName) != -1})
    res.status(200);
    res.type('application/json');
    res.json(result);   
 });

// get records by state by parameter, e.g. http://localhost:8081/state/NC
// this takes in upper or lower case as inputs.
app.get('/state/:state', (req, res) => {
    let state = req.params.state
    const result = data2023.filter((data) => { return data.state == state.toUpperCase()})
    res.status(200);
    res.type('application/json');
    res.json(result);   
 });


// get records via transaction category by parameter, e.g. http://localhost:8081/transactioncat/entertainment
app.get('/transactioncategory/:transact', (req, res) => {
    let transactionCategory = req.params.transact
    const result = data2023.filter((data) => { return data.category.indexOf(transactionCategory) != -1})
    res.status(200);
    res.type('application/json');
    res.json(result);   
 });

// prepare data then start server
readAllData().then((alldata) => {
   data2023 = alldata;
   const server = app.listen(8081, 'localhost', () => {
      const host = server.address().address
      const port = server.address().port
      console.log(`Example app listening at http://${host}:${port}`);
   })
}).catch((error) => {
   console.log("Error:", error)
})
