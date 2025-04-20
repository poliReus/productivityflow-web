export interface Report {
  id: string;
  type: 'weekly' | 'monthly';
  generatedAt: string;
  content: string;
  fileUrl?: string;
}
