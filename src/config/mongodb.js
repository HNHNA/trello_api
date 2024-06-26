
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null ( vì chưa connect)
let trelloDatabaseInstance = null

// Tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý cái serverApi có từ phiên bản 5.0 trở lên, có thể ko cần dùng nó, nếu dùng nó là chúng ta sẽ chỉ định một cái Stable API Version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict : true,
    deprecationErrors: true
  }
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlat với URI đã khai báo trong thân của clientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASENAME)
}

// Đóng kết nối database khi cần
export const CLOSE_DB = async () => {
  // console.log('code chay vao day')
  await mongoClientInstance.close()
}

// Function GET_DB (không asycn) này có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
// Lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error ('Must Connect to Database first')
  return trelloDatabaseInstance
}

