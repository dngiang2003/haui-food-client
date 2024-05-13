export const generateQRCodeImage = (email, secret) => {
  return `https://api.hauifood.com/qr-code?uri=otpauth://totp/HaUI%20Food:%20${email}?secret=${secret}`;
};
