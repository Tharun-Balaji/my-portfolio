export interface Skill {
  title: string;
  imageSrc: string;
}

export interface Project {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  demo: string;
  source: string;
}

export interface HistoryItem {
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  experiences: string[];
  imageSrc: string;
}
