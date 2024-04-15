import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardController } from '~/controllers/boardController'
import { boardValidation } from '~/validations/boardValidation'

const Router = express.Router()

Router.route('/')
  .get(( req, res ) => {
    res.status(StatusCodes.OK).json({ message: 'get: APIs get list boards' })

  })
  .post(boardValidation.createNew, boardController.createNew)


Router.route('/:id')
  .get(boardController.getDetails)
  // .pull() // update

export const boardRouter = Router