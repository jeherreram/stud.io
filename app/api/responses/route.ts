import { NextRequest, NextResponse } from 'next/server';
import { createClientSupabase } from '@/lib/server-supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt_id, content, word_count } = body;

    console.log('Response submission:', { prompt_id, content_length: content?.length, word_count });

    if (!prompt_id || !content || word_count === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create Supabase client with session from cookies
    const supabase = await createClientSupabase();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Insert response
    const { data, error } = await supabase
      .from('user_responses')
      .insert({
        user_id: user.id,
        prompt_id,
        content,
        word_count,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting response:', error);
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/responses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

