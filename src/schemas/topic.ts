import { z } from 'zod'

export const NewTopicSchema = z.object({
  title: z.string(),
  content: z.string(),
  options: z.array(z.string()).length(2),
})

export type NewTopic = z.infer<typeof NewTopicSchema>
