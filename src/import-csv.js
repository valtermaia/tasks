import fs from 'node:fs'
import { parse } from 'csv-parse'
import http from 'node:http'

const file = new URL('../tasks.csv', import.meta.url)

function importCsv() {

   const records = [];

   fs.createReadStream(file)
     .pipe(parse())
     .on("data", (data) => {
      records.push(data);
     })
     .on("end", () => {
        records.splice(0,1)
        records.forEach(sendToDatabase)
     });
}

function sendToDatabase(record) {
   const data = {
      title: record[0],
      description: record[1]
   }
   
   const body = JSON.stringify(data)

   const options = {
      hostname: 'localhost',
      port: 3333,
      path: '/tasks',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
   }

   const req = http.request(options)

   req.on('error', error => {
      console.error('Error:', error);
   });

   req.write(body)
   
   req.end();
}


importCsv()