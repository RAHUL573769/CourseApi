export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export const strongPassword = {
  uppercase: /(?=.*[A-Z])/,
  lowercase: /(?=.*[a-z])/,
  digit: /(?=.*\d)/,
  special: /(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/,
  length: /.{6,}/,
};

// export const strongPasswordRegex =
//   /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{6,}/;
