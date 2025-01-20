export interface FileLinks {
  classic: string
  exclusive: string
}

export type FileLink = {
  [K in keyof FileLinks]: { [P in K]: string }
}[keyof FileLinks]
