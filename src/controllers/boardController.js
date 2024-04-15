import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiErrors'

const createNew = async ( req, res, next ) => {
  try {
  //   console.log('req.body:', req.body)
  //   console.log('req.query:', req.query)
  //   console.log('req.params:', req.params)
  //   console.log('req.files:', req.files)
  //   console.log('req.cookies:', req.cookies)
  //   console.log('req.jwtDecoded:', req.jwtDecoded)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'hanzdev error')
    // Có kết quả thì trả về phía Clients
    res.status(StatusCodes.CREATED).json({ message: ' post: from Controller: API create new board' })
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardController = {
  createNew
}