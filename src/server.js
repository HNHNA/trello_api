/* eslint-disable no-console */


import express from 'express'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {

  const app = express()
  app.use(cors())

  const hostname = 'localhost'
  const port = 8017

  // Enable req.body json data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', APIs_V1)


  // Middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, Backend Server is running at ${ hostname }:${ port }/`)
  })

  exitHook(() => {
    console.log('4. Đang ngắt kết nối tới MongoDB Cloud Atlas...')
    CLOSE_DB().then(() => {
      console.log('5. Đã ngắt kết nối tới MongoDB Cloud Atlas')
      process.exit()
    })
  })
}
// Thực hiện các tác vụ cleanup trước khi dừng server
//   exitHook(() => {
//     console.log('4. Disconecting from MongoDB Cloud Atlas...')
//     CLOSE_DB()
//     console.log('5. Disconected from MongoDB Cloud Atlas')
//   })
// }

// Chỉ khi kết nối =database thành công thì mới Start Server Backend lên.
// Immediately-invokded / Anonymous Async Function (IIFE)
(async () => {
  try {
    console.log('1.Connecting to MongoDB CLoud Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Cách khác:
// Chỉ khi kết nối =database thành công thì mới Start Server Backend lên.
// console.log('1.Connecting to MongoDB CLoud Atlas')
// CONNECT_DB()
//   .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })

