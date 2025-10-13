export interface TestimonialType {
  id: number;
  client_name: string;
  client_position: string;
  comment: string;
  rating: number;
  client_image: string;
  created_at: string;
}

export interface TestimonialsResponseType {
  data: TestimonialType[];
  message: string;
  status_code: number;
}
