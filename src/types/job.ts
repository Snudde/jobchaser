export interface Job {
  id: string;
  headline: string;
  employer: {
    name: string;
  };
  workplace_address: {
    municipality: string;
    region: string;
  };
  description: {
    text: string;
  };
  publication_date: string;
  application_deadline: string;
  webpage_url: string;
  employment_type?: {
    label: string;
  };
  occupation?: {
    label: string;
  };
}
