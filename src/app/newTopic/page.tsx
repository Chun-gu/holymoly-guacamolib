'use client'

import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { createTopic } from '@/lib/topics'
import { type NewTopic, NewTopicSchema } from '@/schemas/topic'
import { useMutation } from '@tanstack/react-query'

export default function NewTopicPage() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<NewTopic>({
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      router.replace('/')
    },
  })

  const onSubmit: SubmitHandler<NewTopic> = (newTopic) => {
    try {
      const { title, content } = NewTopicSchema.parse(newTopic)
      console.log({ title, content })
      mutation.mutate(newTopic)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="주제" {...register('title')} />
      <input type="text" placeholder="내용" {...register('content')} />
      <input type="text" placeholder="선택지 1" {...register('firstOption')} />
      <input type="text" placeholder="선택지 2" {...register('secondOption')} />
      <button>완성</button>
    </form>
  )
}
