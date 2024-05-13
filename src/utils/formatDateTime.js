function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Lấy các thành phần ngày tháng năm, giờ, phút, giây
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần cộng thêm 1
  const day = dateTime.getDate().toString().padStart(2, '0');
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  // Kết quả
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

export default formatDateTime;
