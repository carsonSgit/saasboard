import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { checkWebsite } from '@/lib/monitoring'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: monitors, error } = await supabaseAdmin
      .from('monitors')
      .select('*')
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching monitors:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    for (const monitor of monitors || []) {
      try {
        const result = await checkWebsite(monitor.url)
        
        // Store check result
        const { error: checkError } = await supabaseAdmin
          .from('checks')
          .insert({
            monitor_id: monitor.id,
            response_time: result.responseTime,
            status_code: result.statusCode,
            is_up: result.isUp,
            error_message: result.errorMessage
          })

        if (checkError) {
          console.error(`Error storing check for monitor ${monitor.id}:`, checkError)
          continue
        }

        // Handle incidents
        if (!result.isUp) {
          // Check if there's an active incident
          const { data: activeIncident } = await supabaseAdmin
            .from('incidents')
            .select('id')
            .eq('monitor_id', monitor.id)
            .eq('is_resolved', false)
            .single()

          if (!activeIncident) {
            // Create new incident
            await supabaseAdmin
              .from('incidents')
              .insert({
                monitor_id: monitor.id,
                started_at: new Date().toISOString()
              })
          }
        } else {
          // Resolve any active incidents
          await supabaseAdmin
            .from('incidents')
            .update({ 
              is_resolved: true, 
              resolved_at: new Date().toISOString() 
            })
            .eq('monitor_id', monitor.id)
            .eq('is_resolved', false)
        }
      } catch (error) {
        console.error(`Error checking monitor ${monitor.id}:`, error)
      }
    }

    return NextResponse.json({ success: true, checked: monitors?.length || 0 })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
