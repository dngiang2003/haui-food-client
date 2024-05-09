function formatCurrency(input) {
  // Kiểm tra nếu đầu vào là null hoặc không phải là số hoặc chuỗi
  if (input === null || (typeof input !== 'number' && typeof input !== 'string')) {
    return '';
  }

  // Chuyển đổi đầu vào thành chuỗi và loại bỏ tất cả các ký tự không phải số
  const numberString = String(input).replace(/\D/g, '');

  // Nếu chuỗi kết quả sau khi loại bỏ ký tự không phải số là rỗng
  // hoặc không phải là số, trả về chuỗi rỗng
  if (numberString === '' || isNaN(numberString)) {
    return '';
  }

  // Sử dụng regex để chèn dấu chấm vào giữa mỗi ba chữ số
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Ví dụ sử dụng
console.log(formatCurrency(1000)); // Output: "1.000"
console.log(formatCurrency('20,000')); // Output: "20.000"
console.log(formatCurrency(null)); // Output: ""

export default formatCurrency;
