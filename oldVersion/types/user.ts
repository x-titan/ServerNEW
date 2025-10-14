export default interface User {
  id: number
  username: string
  password: string
  created_at: Date
  updated_at: Date
}

export interface PublicUser {
  id: number
  username: string
}
