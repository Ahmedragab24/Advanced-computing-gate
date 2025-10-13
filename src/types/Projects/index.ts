export interface ProjectType {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  project_link: string;
  tags: string[];
}

export interface ProjectsResponseType {
  data: ProjectType[];
  message: string;
  status_code: number;
}
