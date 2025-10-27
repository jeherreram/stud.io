import { NextResponse } from 'next/server';
import { createClientSupabase } from '@/lib/server-supabase';
import type { EmailPrompt } from '@/types/database';

export async function GET() {
  try {
    const supabase = await createClientSupabase();
    
    // Get random email prompt
    const { data: prompts, error } = await supabase
      .from('email_prompts')
      .select('*')
      .limit(100);

    if (error) {
      console.error('Error fetching prompts:', error);
      return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
    }

    if (!prompts || prompts.length === 0) {
      return NextResponse.json({ error: 'No prompts available' }, { status: 404 });
    }

    // Select random prompt
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    return NextResponse.json(randomPrompt as EmailPrompt);
  } catch (error) {
    console.error('Error in /api/prompts/random:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

