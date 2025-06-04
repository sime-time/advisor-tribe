export interface Category {
  name: string;
  path: string;
  iconColor: string;
  bgColor: string;
  icon: string;
}

// Define types for process steps
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  isLast?: boolean;
}
