import Anthropic from '@anthropic-ai/sdk';
import type { EvaluationRequest, ClaudeEvaluationResponse } from '@/types/evaluation';
import type { EmailPrompt } from '@/types/database';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('⚠️ ANTHROPIC_API_KEY is not set in environment variables');
}

export async function evaluateResponse(
  request: EvaluationRequest,
  prompt: EmailPrompt
): Promise<ClaudeEvaluationResponse> {
  const systemPrompt = `You are an expert German language evaluator specializing in Telc B1 email writing assessment.

Your task is to evaluate a student's German email response based on OFFICIAL TELC B1 CRITERIA.

EVALUATION CRITERIA:

**Criterion I - Leitpunkte (Content Points)** - 5 points max
- A (5 pts): All 4 required points addressed appropriately and completely
- B (3 pts): 3 required points addressed appropriately
- C (1 pt): 2 required points addressed appropriately
- D (0 pts): 1 or no points addressed appropriately
- **CRITICAL**: Must check ALL 4 required points from the prompt

**Criterion II - Kommunikative Gestaltung (Communicative Design)** - 5 points max
- A (5 pts): Excellent format, structure, appropriate expression and register
- B (3 pts): Good format and structure with minor issues
- C (1 pt): Acceptable format with noticeable problems
- D (0 pts): Inappropriate format, structure, expression or register
- Consider: Opening/greeting, closing, paragraphing, formality level, linguistic variety

**Criterion III - Formale Richtigkeit (Formal Accuracy)** - 5 points max
- A (5 pts): Few to no errors in grammar and spelling
- B (3 pts): Some errors that don't impair understanding
- C (1 pt): Several errors that occasionally impair understanding
- D (0 pts): Many errors that frequently impair understanding
- Consider: Grammar, syntax, word order, case errors, verb conjugation, spelling

**AUTOMATIC FAILURE RULE**: If Criterion I OR Criterion III receives a D grade, the student FAILS (passed = false).

WEAKNESS CATEGORIES (categorize any errors found):
1. CASE_ERRORS - Nominativ/Akkusativ/Dativ/Genitiv mistakes
2. VERB_CONJUGATION - Incorrect verb forms and tenses
3. WORD_ORDER - Wrong sentence structure
4. VOCABULARY_CHOICE - Inappropriate word choice or register
5. EMAIL_FORMAT - Missing greeting, closing, or wrong structure
6. CONTENT_COMPLETENESS - Not addressing all required points
7. SPELLING_ERRORS - Orthography and spelling mistakes
8. SENTENCE_STRUCTURE - Problems with complex sentences and connectors

Response Format (JSON only):
{
  "evaluation": {
    "criterion_i": {
      "grade": "A" | "B" | "C" | "D",
      "justification": "Brief explanation"
    },
    "criterion_ii": {
      "grade": "A" | "B" | "C" | "D",
      "justification": "Brief explanation"
    },
    "criterion_iii": {
      "grade": "A" | "B" | "C" | "D",
      "justification": "Brief explanation"
    }
  },
  "weaknesses": [
    {
      "category": "CATEGORY_NAME",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "description": "Specific error description",
      "examples": ["concrete example 1", "concrete example 2"]
    }
  ],
  "general_feedback": "Overall feedback in German explaining strengths and areas for improvement"
}`;

  const userPrompt = `Evaluate this German email response according to Telc B1 criteria:

**EMAIL TYPE**: ${prompt.type}
**PROMPT SCENARIO**: ${prompt.scenario}
**SENDER**: ${prompt.sender}
**REQUIRED POINTS TO ADDRESS**:
${prompt.required_points.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**STUDENT RESPONSE**:
${request.user_response}

Provide your evaluation in the exact JSON format specified. Be thorough but fair in your assessment.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format from Claude');
    }

    // Parse JSON response - try to find JSON block
    let jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Try to find JSON in code blocks
      const codeBlockMatch = content.text.match(/```json\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        jsonMatch = [codeBlockMatch[1]];
      } else {
        throw new Error('No JSON found in Claude response');
      }
    }

    // Clean the JSON string by removing control characters
    const jsonString = jsonMatch[0]
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/\r\n/g, '\\n') // Normalize line breaks
      .replace(/\n/g, '\\n');
    
    try {
      const result = JSON.parse(jsonString) as ClaudeEvaluationResponse;
      return result;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse:', jsonString.substring(0, 500));
      throw new Error(`Failed to parse Claude response: ${parseError.message}`);
    }
  } catch (error: any) {
    console.error('Evaluation error:', error);
    throw new Error(`Failed to evaluate response: ${error.message}`);
  }
}

export function calculatePoints(grade: 'A' | 'B' | 'C' | 'D'): number {
  const pointsMap = { A: 5, B: 3, C: 1, D: 0 };
  return pointsMap[grade];
}

export function determinePassed(
  criterionI: 'A' | 'B' | 'C' | 'D',
  criterionIII: 'A' | 'B' | 'C' | 'D'
): boolean {
  // Automatic failure if either Criterion I or III is D
  return criterionI !== 'D' && criterionIII !== 'D';
}

