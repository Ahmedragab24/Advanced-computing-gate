export interface ServiceType {
  id: number;
  title: string;
  description: string;
}

export interface ServicesResponseType {
  data: ServiceType[];
  message: string;
  status_code: number;
}
