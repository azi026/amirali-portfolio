export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  role?: string;
  technologies: string[];
  deliverables?: string[];
  year: string;
  liveUrl?: string;
}
