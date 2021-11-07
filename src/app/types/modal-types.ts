export interface ModalTypes {
  id: number,
  category: string,
  type: string,
  label: string,
  description: string,
  abilities: string,
  images: Array<string>
}

export class ModalData<T> {
  inputData?: T;
}

export class GreetingData {
  name!: string;
  message!: string;
  sender?: string
}
