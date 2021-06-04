export default interface ICreateEventDTO {
  name: string;
  description: string;
  type: 'Show' | 'Festa' | 'Teatro';
  date: Date;
  state_city: string;
  street: string;
  neighborhood: string;
  number: string;
  CEP: string;
  owner_id: string;
  available_tickets: number;
  promo_image: string;
}
