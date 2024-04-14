/* eslint-disable no-console */


import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = () => {

  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3.Hello Hanzdev, Backend Server is running at ${ hostname }:${ port }/`)
  })
}

// Chỉ khi kết nối =database thành công thì mới Start Server Backend lên.
// Immediately-invokded / Anonymous Async Function (IIFE)
(async () => {
  try {
    console.log('1.Connecting to MongoDB CLoud Atlas')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()


// // Chỉ khi kết nối =database thành công thì mới Start Server Backend lên.
// console.log('1.Connecting to MongoDB CLoud Atlas')
// CONNECT_DB()
//   .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })

