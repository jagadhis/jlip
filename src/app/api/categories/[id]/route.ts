import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// @ts-nocheck - disable typescript checking for this file
export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', context.params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('categories')
      .update(body)
      .eq('id', context.params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', context.params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}