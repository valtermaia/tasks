import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'


const database = new Database()
const tasks = []

const server = http.createServer(async (req, res) => {
   const { method, url } = req

   await json(req,res)

   if (method === 'GET' && url === '/tasks') {
      return res.end(JSON.stringify(tasks))
   }

   if (method === 'POST' && url === '/tasks') {
      const {title, description} = req.body
      tasks.push({
         id: 1,
         title,
         description
      })      
      console.log('tasks = ', tasks.length)
      return res.writeHead(201).end()
   }
   return res.writeHead(404).end()
})

server.listen(3333)
