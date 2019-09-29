
export interface Result {
  value: number
  comment: string
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

export interface State {
  title: string
  wineAttributes: WineAttribute[]
  result: Result
}

export interface InputValue {
  id: number
  value: number
}
