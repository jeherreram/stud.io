export type EmailType = 'formal' | 'semi-formal' | 'informal';

export type WeaknessCategory = 
  | 'CASE_ERRORS'
  | 'VERB_CONJUGATION'
  | 'WORD_ORDER'
  | 'VOCABULARY_CHOICE'
  | 'EMAIL_FORMAT'
  | 'CONTENT_COMPLETENESS'
  | 'SPELLING_ERRORS'
  | 'SENTENCE_STRUCTURE';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';
export type Grade = 'A' | 'B' | 'C' | 'D';

export interface EmailPrompt {
  id: string;
  type: EmailType;
  difficulty: number;
  scenario: string;
  sender: string;
  content: string;
  required_points: string[];
  created_at: string;
}

export interface UserResponse {
  id: string;
  user_id: string;
  prompt_id: string;
  content: string;
  word_count: number;
  created_at: string;
}

export interface Evaluation {
  id: string;
  response_id: string;
  criterion_i_grade: Grade;
  criterion_i_points: number;
  criterion_ii_grade: Grade;
  criterion_ii_points: number;
  criterion_iii_grade: Grade;
  criterion_iii_points: number;
  total_points: number;
  passed: boolean;
  feedback: string;
  created_at: string;
}

export interface UserWeakness {
  id: string;
  user_id: string;
  evaluation_id: string;
  category: WeaknessCategory;
  severity: Severity;
  description: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

