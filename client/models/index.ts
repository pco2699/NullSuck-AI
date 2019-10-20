export interface Result {
  value: number
  comment: string
  status: boolean
}

export interface WineAttribute {
  id: number
  japanese_title: string
  english_title: string
  value: number
  step: number
  max_value: number
  min_value: number
}

export interface InputValue {
  id: number
  value: number
}
