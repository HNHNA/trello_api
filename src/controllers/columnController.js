import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async ( req, res, next ) => {
  try {
    // Điều hướng dữ liệu tấng Service
    const createdColumn = await columnService.createNew(req.body)
    // Có kết quả thì trả về phía Clients
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) { next(error) }
}


export const columnController = {
  createNew
}