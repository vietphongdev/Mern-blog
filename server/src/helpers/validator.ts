export function validateEmail(email: string) {
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string) {
  // var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return phoneRegex.test(phone);
}

export function validateEmailOrPhone(value: string) {
  return validateEmail(value) || validatePhone(value);
}

export function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  return passwordRegex.test(password);
}
