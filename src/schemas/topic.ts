import { z } from 'zod'

export const NewTopicSchema = z.object({
  title: z.string(),
  content: z.string(),
  firstOption: z.string(),
  secondOption: z.string(),
})

export type NewTopic = z.infer<typeof NewTopicSchema>
