'use client'

import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { createTopic } from '@/lib/topics'
import { type NewTopic, NewTopicSchema } from '@/lib/topics'
import { useMutation } from '@tanstack/react-query'

export default function NewTopicPage() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<NewTopic>({
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: createTopic,
    onSuccess: ({ createdTopicId }) => {
      router.replace(`/topics/${createdTopicId}`)
    },
  })

  const onSubmit: SubmitHandler<NewTopic> = (newTopic) => {
    try {
      const parsedNewTopic = NewTopicSchema.parse(newTopic)
      mutation.mutate(parsedNewTopic)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="주제" {...register('title')} />
      <input type="text" placeholder="내용" {...register('content')} />
      <input type="text" placeholder="선택지 1" {...register(`options.${0}`)} />
      <input type="text" placeholder="선택지 2" {...register(`options.${1}`)} />
      <button>완성</button>
    </form>
  )
}
