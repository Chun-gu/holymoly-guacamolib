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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-1">
      <textarea
        placeholder="대댓글 추가"
        {...register('content', {
          required: '대댓글을 입력해 주세요.',
          maxLength: { value: 100, message: '최대 100자까지 입력 가능합니다.' },
        })}
        className="w-full py-[7px] px-[14px] border border-green placeholder:text-green placeholder:text-[14px] resize-none mb-[4px]"
      />
      <div className="flex justify-end">
        <button
          disabled={isSubmitting}
          className="py-[6px] px-[18px] bg-green rounded-full text-white text-[12px]"
        >
          저장하기
        </button>
      </div>
    </form>
  )
}
