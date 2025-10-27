import { NextResponse } from 'next/server';
import { createClientSupabase } from '@/lib/server-supabase';

export async function GET() {
  try {
    const supabase = await createClientSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all evaluations with responses and prompts
    const { data: evaluations, error } = await supabase
      .from('evaluations')
      .select(`
        *,
        user_responses (
          prompt_id,
          prompt:email_prompts (
            type
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching progress:', error);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    // Calculate statistics
    const totalAttempts = evaluations?.length || 0;
    const totalPassed = evaluations?.filter((e: any) => e.passed).length || 0;
    const avgScore = evaluations?.reduce((sum: number, e: any) => sum + e.total_points, 0) / (totalAttempts || 1);
    
    // Group by email type
    const byType: Record<string, any[]> = {};
    evaluations?.forEach((eval: any) => {
      const type = eval.user_responses?.prompt?.type || 'unknown';
      if (!byType[type]) byType[type] = [];
      byType[type].push(eval);
    });

    return NextResponse.json({
      total_attempts: totalAttempts,
      total_passed,
      pass_rate: totalAttempts > 0 ? (totalPassed / totalAttempts) * 100 : 0,
      avg_score: avgScore,
      by_type: Object.entries(byType).map(([type, evals]) => ({
        type,
        attempts: evals.length,
        passed: evals.filter(e => e.passed).length,
        avg_score: evals.reduce((sum, e) => sum + e.total_points, 0) / evals.length,
      })),
      recent_evaluations: evaluations?.slice(0, 10),
    });
  } catch (error) {
    console.error('Error in /api/progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

