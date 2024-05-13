export const getLocalStorageItem = (itemName) => {
  try {
    const item = JSON.parse(localStorage.getItem(itemName));
    return item;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin từ localStorage cho item ${itemName}:`, error);
    return null;
  }
};

export const updateFieldInLocalStorage = (fieldName, fieldValueName, newValue) => {
  try {
    // Lấy đối tượng từ localStorage
    const storedData = JSON.parse(localStorage.getItem(fieldName));
    // Kiểm tra xem đối tượng có tồn tại và có chứa trường fieldValueName không
    if (!storedData || typeof storedData !== "object" || !storedData.hasOwnProperty(fieldValueName)) {
      console.error(`Đối tượng ${fieldName} không hợp lệ hoặc thiếu trường "${fieldValueName}"`);
      return;
    }

    // Cập nhật giá trị cho trường fieldValueName
    storedData[fieldValueName] = newValue;

    // Lưu lại đối tượng đã được cập nhật vào localStorage
    localStorage.setItem(fieldName, JSON.stringify(storedData));
  } catch (error) {
    console.error(`Lỗi khi cập nhật giá trị ${fieldValueName} của ${fieldName} trong localStorage:`, error);
  }
};

export const addOrUpdateFieldInLocalStorage = (fieldName, newField, newValue) => {
  try {
    let storedData;
    if (fieldName) {
      // Lấy đối tượng từ localStorage hoặc tạo mới nếu chưa tồn tại
      storedData = JSON.parse(localStorage.getItem(fieldName)) || {};
      if (newField) {
        // Thêm hoặc cập nhật trường mới với giá trị được cung cấp
        storedData[newField] = newValue;
      } else {
        // Tạo một item mới với tên là newField và giá trị là newValue
        storedData[newField] = newValue;
      }
      // Lưu lại đối tượng đã được cập nhật vào localStorage
      localStorage.setItem(fieldName, JSON.stringify(storedData));
    } else {
      // Tạo một item mới với tên là newField và giá trị là newValue
      localStorage.setItem(newField, JSON.stringify(newValue));
    }
  } catch (error) {
    console.error(`Lỗi khi thêm hoặc cập nhật trường trong localStorage:`, error);
  }
};
