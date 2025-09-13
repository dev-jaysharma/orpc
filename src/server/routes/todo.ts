import { os } from '@orpc/server'
import { z } from 'zod'
import { db } from '../db'
import { todoTable } from '../db/schema'

export const todoSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
})

export const createTodoInputSchema = todoSchema.omit({ id: true })

export const createTodo = os
    .input(createTodoInputSchema)
    .output(todoSchema)
    .handler(async ({ input }) => {
        const todo = await db.insert(todoTable).values({
            title: input.title,
            description: input.description,
        }).returning()
        return todo[0]
    })