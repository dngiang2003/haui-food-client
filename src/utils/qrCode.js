import hostname from './http';

export const generateQRCodeImage = (email, secret) => {
  return `${hostname}qr-code?uri=otpauth://totp/HaUI%20Food:%20${email}?secret=${secret}`;
};
