import { supabase, supabaseAdmin } from '@/lib/supabase'
import { DatabaseError } from '@/lib/api/errors'
import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

/**
 * Base repository class with common database operations
 */
export abstract class BaseRepository<T> {
  protected readonly tableName: string
  protected readonly client: SupabaseClient

  constructor(tableName: string, useAdmin: boolean = false) {
    this.tableName = tableName
    this.client = useAdmin ? supabaseAdmin : supabase
  }

  /**
   * Handle database errors
   */
  protected handleError(error: PostgrestError | null): void {
    if (error) {
      console.error(`Database error in ${this.tableName}:`, error)
      throw new DatabaseError(error.message, {
        code: error.code,
        details: error.details,
        hint: error.hint
      })
    }
  }

  /**
   * Find all records
   */
  async findAll(): Promise<T[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')

    this.handleError(error)
    return data || []
  }

  /**
   * Find record by ID
   */
  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error?.code === 'PGRST116') {
      return null // Not found
    }

    this.handleError(error)
    return data
  }

  /**
   * Create a new record
   */
  async create(record: Partial<T>): Promise<T> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(record as any)
      .select()
      .single()

    this.handleError(error)
    return data!
  }

  /**
   * Update a record by ID
   */
  async update(id: string, record: Partial<T>): Promise<T> {
    const { data, error } = await this.client
      .from(this.tableName)
      .update(record as any)
      .eq('id', id)
      .select()
      .single()

    this.handleError(error)
    return data!
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', id)

    this.handleError(error)
  }

  /**
   * Count records with optional filter
   */
  async count(column?: string, value?: any): Promise<number> {
    let query = this.client
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })

    if (column && value !== undefined) {
      query = query.eq(column, value)
    }

    const { count, error } = await query
    this.handleError(error)
    return count || 0
  }
}

