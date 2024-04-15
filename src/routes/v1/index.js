import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from './boardRoute'
import { columnRouter } from './/columnRouter'
import { cardRouter } from './cardRouter'


const Router = express.Router()

// check APIs v1 status
Router.get('/status', ( req, res ) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// Board APIs
Router.use('/boards', boardRouter)

// Column APIs
Router.use('/columns', columnRouter)

// Card APIs
Router.use('/cards', cardRouter)


export const APIs_V1 = Router