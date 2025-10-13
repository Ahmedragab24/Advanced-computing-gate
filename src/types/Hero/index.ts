export interface HeroSectionResponseType {
  data: {
    title: string;
    subtitle: string;
    description: string;
    projects_count: number;
    clients_count: number;
    years_experience: number;
  };
  message: string;
  status_code: number;
}
