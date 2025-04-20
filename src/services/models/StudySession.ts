export interface StudySession {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  focusMode: boolean;
  date: string;
}
