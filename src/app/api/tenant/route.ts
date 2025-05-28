// src/app/api/tenant/route.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {

  const { userId } = req.body

  if (userId) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    );
  }

  // Busca o tenant no Supabase
  const { data, error } = await supabase
    .from('tenants')
    .select(`
      id,
      clientes:cliente_id (
        id,
        nome,
        plano,
        logo_url
      )
    `)
    .eq('clerk_user_id', userId)
    .single();

  if (error || !data?.clientes) {
    return NextResponse.json(
      { error: 'Cliente não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(data.clientes);
}