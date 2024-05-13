export const generateQRCodeImage = (email, secret) => {
  return `https://haui-food-api.onrender.com/qr-code?uri=otpauth://totp/HaUI%20Food:%20${email}?secret=${secret}`;
};
