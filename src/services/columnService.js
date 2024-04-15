/* eslint-disable quotes */
import { columnModel } from "~/models/columnModel"
import { boardModel } from "~/models/boardModel"


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
    if (getNewColumn) {
      // Xử lí cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)

    }

    // Trả kết quả về, trong service phải luôn có return
    return getNewColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew
}