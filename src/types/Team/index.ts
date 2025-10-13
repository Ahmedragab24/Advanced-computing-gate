export interface MemberType {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
}

export interface TeamResponseType {
  data: {
    counters: {
      team_members: number;
      certifications: number;
      years_experience: number;
    };
    members: MemberType[];
  };
  message: string;
  status_code: number;
}
