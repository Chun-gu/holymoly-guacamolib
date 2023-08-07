'use client'

import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { queryClient } from './Providers'
import { createSubComment, subCommentKey } from '@/lib/subComments'
import type { Comment, NewComment as NewSubComment } from '@/lib/comments'

type Props = { commentId: Comment['id'] }

export default function SubCommentInput({ commentId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewSubComment>()

  const mutation = useMutation({
    mutationFn: createSubComment,
    onSuccess: () => {
      queryClient.invalidateQueries(subCommentKey.listOf(commentId))
      reset()
    },
  })

  const onSubmit: SubmitHandler<NewSubComment> = (newSubComment) => {
    mutation.mutate({ commentId, newSubComment })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="대댓글"
        {...register('content', {
          required: '대댓글을 입력해 주세요.',
          maxLength: { value: 100, message: '최대 100자까지 입력 가능합니다.' },
        })}
      />
      <button disabled={isSubmitting}>작성</button>
    </form>
  )
}
