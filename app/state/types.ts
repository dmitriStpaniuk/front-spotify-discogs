export type User = {
  name: string,
  email: string,
  password: string,
}

export type GetUserResponse = {
  id: string,
  name: string,
  email: string,
  password: string,
  photo: string,
  verified: boolean,
  role: 'USER' | 'ADMIN',
  verificationCode: string,
  createdAt: Date,
  updatedAt: Date,
  provider: string,
  passwordResetToken: string,
  passwordResetAt: Date,
}

export type Status = 'default' | 'loading' | 'success' | 'error';