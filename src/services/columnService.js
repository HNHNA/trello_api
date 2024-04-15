/* eslint-disable quotes */
import { slugify } from "~/utils/formatters"
import { columnModel } from "~/models/columnModel"


const createNew = async( reqBody ) => {
  try {
    // Xử lí logic dữ liệu
    const newColumn = {
      ...reqBody
    }
    // Gọi tới tấng model để xử lý lưu ghi newColumn vào Database
    const createdColumn = await columnModel.createNew(newColumn)
    // Lấy bản ghi column sau khi gọi ( tùy mục đích)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    // ....

    // Trả kết quả về, trong service phải luôn có return
    return getNewColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew
}