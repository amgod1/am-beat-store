export interface FileLinks {
  pro: string
  exclusive: string
}

export type FileLink = {
  [K in keyof FileLinks]: { [P in K]: string }
}[keyof FileLinks]
