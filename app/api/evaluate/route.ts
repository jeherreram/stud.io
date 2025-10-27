import { NextRequest, NextResponse } from 'next/server';
import { createClientSupabase } from '@/lib/server-supabase';
import { evaluateResponse, calculatePoints, determinePassed } from '@/lib/evaluation-service';
import type { EvaluationRequest } from '@/types/evaluation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { response_id, prompt_id, user_response, required_points, email_type } = body;

    console.log('Evaluation request:', { response_id, prompt_id, hasResponse: !!user_response });

    if (!response_id || !user_response) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClientSupabase();
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify response belongs to authenticated user
    const { data: userResponse, error: respError } = await supabase
      .from('user_responses')
      .select('user_id')
      .eq('id', response_id)
      .single();
    
    if (respError || !userResponse) {
      console.error('Error finding response:', respError);
      return NextResponse.json({ error: 'Response not found' }, { status: 404 });
    }

    if (userResponse.user_id !== user.id) {
      return NextResponse.json({ error: 'Not authorized to evaluate this response' }, { status: 403 });
    }

    // Get prompt details
    const { data: prompt, error: promptError } = await supabase
      .from('email_prompts')
      .select('*')
      .eq('id', prompt_id)
      .single();

    if (promptError || !prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Evaluate with Claude
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('⚠️ ANTHROPIC_API_KEY not found in environment');
      return NextResponse.json({ error: 'Anthropic API key not configured. Check .env.local file.' }, { status: 500 });
    }

    const evaluationRequest: EvaluationRequest = {
      response_id,
      prompt_id,
      user_response,
      required_points,
      email_type,
    };

    console.log('Calling Claude API...');
    const claudeResult = await evaluateResponse(evaluationRequest, prompt);
    console.log('Claude evaluation complete');

    // Calculate points and determine if passed
    const criterionIPoints = calculatePoints(claudeResult.evaluation.criterion_i.grade);
    const criterionIIPoints = calculatePoints(claudeResult.evaluation.criterion_ii.grade);
    const criterionIIIPoints = calculatePoints(claudeResult.evaluation.criterion_iii.grade);
    const totalPoints = criterionIPoints + criterionIIPoints + criterionIIIPoints;
    const passed = determinePassed(
      claudeResult.evaluation.criterion_i.grade,
      claudeResult.evaluation.criterion_iii.grade
    );

    // Save evaluation
    const { data: evaluation, error: evalError } = await supabase
      .from('evaluations')
      .insert({
        response_id,
        criterion_i_grade: claudeResult.evaluation.criterion_i.grade,
        criterion_i_points: criterionIPoints,
        criterion_ii_grade: claudeResult.evaluation.criterion_ii.grade,
        criterion_ii_points: criterionIIPoints,
        criterion_iii_grade: claudeResult.evaluation.criterion_iii.grade,
        criterion_iii_points: criterionIIIPoints,
        total_points: totalPoints,
        passed,
        feedback: claudeResult.general_feedback,
      })
      .select()
      .single();

    if (evalError) {
      console.error('Error inserting evaluation:', evalError);
      return NextResponse.json({ error: 'Failed to save evaluation' }, { status: 500 });
    }

    // Save weaknesses
    if (claudeResult.weaknesses && claudeResult.weaknesses.length > 0) {
      const weaknessesToInsert = claudeResult.weaknesses.map((weakness) => ({
        user_id: user.id,
        evaluation_id: evaluation.id,
        category: weakness.category,
        severity: weakness.severity,
        description: weakness.description,
      }));

      await supabase.from('user_weaknesses').insert(weaknessesToInsert);
    }

    return NextResponse.json({
      evaluation,
      weaknesses: claudeResult.weaknesses,
    });
  } catch (error: any) {
    console.error('Error in /api/evaluate:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

