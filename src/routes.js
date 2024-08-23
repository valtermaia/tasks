import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
   {
      method: 'GET',
      path: buildRoutePath('/tasks'),
      handler: (req,res) => {
         const tasks = database.select('tasks')
         return res.end(JSON.stringify(tasks))
      }
   },
   {
      method: 'POST',
      path: buildRoutePath('/tasks'),
      handler: (req,res) => {

         const {title, description} = req.body

         if (!title || !description) {
            return res.writeHead(406).end('title or description not provided')
         }
      
         const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: null
         }
         database.insert('tasks',task)

         return res.writeHead(201).end()
      }
   },
   {
      method: 'DELETE',
      path: buildRoutePath('/tasks/:id'),
      handler: (req,res) => {
         const { id } = req.params
         try {
            database.delete('tasks', id)
            return res.writeHead(204).end()
         } catch (error) {
            return res.writeHead(404).end(error)            
         }
      }
   },

   {
      method: 'PUT',
      path: buildRoutePath('/tasks/:id'),
      handler: (req,res) => {
         const { id } = req.params
         const { title, description, completed_at, created_at } = req.body

         if (!title || !description) {
            return res.writeHead(406).end('title or description not provided')
         }

         try {
            database.update('tasks',id,{
               title,
               description,
               completed_at,
               created_at,
               updated_at: new Date()
            })
            return res.writeHead(204).end()
         } catch (error) {
            return res.writeHead(404).end(error) 
         }
      }
   },

   {
      method: 'PATCH',
      path: buildRoutePath('/tasks/:id/complete'),
      handler: (req,res) => {
         const { id } = req.params
         try {
            database.markCompletedTask('tasks',id,new Date())
            return res.writeHead(204).end()
         } catch (error) {
            return res.writeHead(404).end(error)
         }
      }
   },

]