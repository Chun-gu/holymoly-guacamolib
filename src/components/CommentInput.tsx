'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from './Providers'
import { commentKey, createComment } from '@/lib/comments'
import type { Topic } from '@/lib/topics'
import type { NewComment } from '@/lib/comments'

type Props = { topicId: Topic['id'] }

export default function CommentInput({ topicId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<NewComment>({
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(commentKey.list(topicId))
      reset()
    },
    onError: (error) => {},
  })

  const onSubmit: SubmitHandler<NewComment> = (newComment) => {
    mutation.mutate({ topicId, newComment })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-[26px]">
      <textarea
        placeholder="댓글 추가"
        maxLength={100}
        {...register('content', {
          required: '내용을 입력해주세요.',
          maxLength: {
            value: 100,
            message: '최대 100자까지 입력 가능합니다.',
          },
        })}
        className="w-full py-[7px] px-[14px] border border-green placeholder:text-green placeholder:text-[14px] resize-none mb-[10px]"
      />
      {/* {errors.content && <p>{errors.content.message}</p>} */}

      <div className="flex justify-end">
        <button
          disabled={isSubmitting || !isValid}
          className="py-[6px] px-[18px] bg-green rounded-full text-white text-[12px]"
        >
          저장하기
        </button>
      </div>
    </form>
  )
}
