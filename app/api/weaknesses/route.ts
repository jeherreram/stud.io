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

    // Get all weaknesses
    const { data: weaknesses, error } = await supabase
      .from('user_weaknesses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching weaknesses:', error);
      return NextResponse.json({ error: 'Failed to fetch weaknesses' }, { status: 500 });
    }

    // Group by category and calculate stats
    const byCategory: Record<string, any> = {};
    const categories = [
      'CASE_ERRORS',
      'VERB_CONJUGATION',
      'WORD_ORDER',
      'VOCABULARY_CHOICE',
      'EMAIL_FORMAT',
      'CONTENT_COMPLETENESS',
      'SPELLING_ERRORS',
      'SENTENCE_STRUCTURE',
    ];

    categories.forEach(cat => {
      byCategory[cat] = {
        total: 0,
        low: 0,
        medium: 0,
        high: 0,
      };
    });

    weaknesses?.forEach((w: any) => {
      byCategory[w.category].total++;
      byCategory[w.category][w.severity.toLowerCase()]++;
    });

    // Get recent weaknesses
    const recentWeaknesses = weaknesses?.slice(0, 20);

    return NextResponse.json({
      by_category: byCategory,
      recent: recentWeaknesses,
      total_weaknesses: weaknesses?.length || 0,
    });
  } catch (error) {
    console.error('Error in /api/weaknesses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

