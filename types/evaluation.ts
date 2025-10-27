import { Grade, WeaknessCategory, Severity } from './database';

export interface EvaluationRequest {
  response_id: string;
  prompt_id: string;
  user_response: string;
  required_points: string[];
  email_type: string;
}

export interface WeaknessItem {
  category: WeaknessCategory;
  severity: Severity;
  description: string;
  examples?: string[];
}

export interface EvaluationResult {
  criterion_i: {
    grade: Grade;
    points: number;
    feedback: string;
  };
  criterion_ii: {
    grade: Grade;
    points: number;
    feedback: string;
  };
  criterion_iii: {
    grade: Grade;
    points: number;
    feedback: string;
  };
  total_points: number;
  passed: boolean;
  general_feedback: string;
  weaknesses: WeaknessItem[];
}

export interface ClaudeEvaluationResponse {
  evaluation: {
    criterion_i: { grade: Grade; justification: string };
    criterion_ii: { grade: Grade; justification: string };
    criterion_iii: { grade: Grade; justification: string };
  };
  weaknesses: Array<{
    category: WeaknessCategory;
    severity: Severity;
    description: string;
    examples?: string[];
  }>;
  general_feedback: string;
}

