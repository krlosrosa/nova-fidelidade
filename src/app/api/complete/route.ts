import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const { userId } = await req.json();

  console.log(userId, supabaseUrl, supabaseKey)

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { hasCompletedOnboarding: true },
    });

    const { data: userData, error: supabaseError } = await supabase
      .from('tenants') // substitua pelo nome da sua tabela
      .select('*')
      .eq('clerk_id', userId)
      .single();

      console.log({data: userData, error: supabaseError})

    return NextResponse.json({ id: userId });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
