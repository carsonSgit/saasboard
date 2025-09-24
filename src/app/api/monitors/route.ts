import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { checkSubscriptionLimit } from '@/lib/subscriptions'

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user from Clerk auth
    // For now, we'll use a mock user ID
    const userId = 'mock-user-id'

    const { data: monitors, error } = await supabase
      .from('monitors')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ monitors })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real app, you'd get the user from Clerk auth
    const userId = 'mock-user-id'

    const body = await request.json()
    const { name, url, checkInterval, notificationEmail } = body

    // Check subscription limits
    const { data: existingMonitors } = await supabase
      .from('monitors')
      .select('id')
      .eq('user_id', userId)

    const userTier = 'free' // In a real app, get from user profile
    if (!checkSubscriptionLimit(userTier, 'monitors', existingMonitors?.length || 0)) {
      return NextResponse.json({ error: 'Monitor limit exceeded' }, { status: 403 })
    }

    const { data: monitor, error } = await supabase
      .from('monitors')
      .insert({
        user_id: userId,
        name,
        url,
        check_interval: checkInterval || 300,
        notification_email: notificationEmail
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ monitor })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
