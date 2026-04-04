/**
 * Chuyển đổi một đối tượng Mongoose thành Plain Object với 'id' thay vì '_id'
 * Hỗ trợ đệ quy cho các trường đã được populate.
 */
export function formatDocument(doc: any): any {
  if (!doc) return null;

  // Nếu là mảng, xử lý từng phần tử
  if (Array.isArray(doc)) {
    return doc.map((item) => formatDocument(item));
  }

  // Nếu có hàm toObject (là Mongoose Document)
  const obj = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };

  // Xử lý id
  if (obj._id) {
    obj.id = obj._id.toString();
    delete obj._id;
  }

  // Xóa các trường rác
  delete obj.__v;
  delete obj.password;
  delete obj.refreshToken;

  // Đệ quy cho các object con (như role được populate)
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key]) && !(obj[key] instanceof Date)) {
      // Chỉ đệ quy nếu là Object thực sự (không phải Date, Buffer, v.v.)
      // Kiểm tra nếu là ObjectId (thường có thuộc tính _bsontype hoặc id)
      if (obj[key]._id || obj[key].id) {
         obj[key] = formatDocument(obj[key]);
      }
    } else if (Array.isArray(obj[key])) {
       // Nếu là mảng các object (ví dụ permissions)
       obj[key] = obj[key].map((item: any) => {
          if (item && typeof item === "object" && item._id) {
            return formatDocument(item);
          }
          return item;
       });
    }
  });

  return obj;
}
