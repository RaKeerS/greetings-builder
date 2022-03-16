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
  emailSubject!: string;
  recipientName!: string;
  customMessage!: string;
  recipientAddress!: string[];
  recipientAddressCC?: string[];
  recipientAddressBCC?: string[];
  senderAddress!: string;
  senderName?: string;
  enableRecipientName?: boolean;
  enableSenderName?: boolean;
}
