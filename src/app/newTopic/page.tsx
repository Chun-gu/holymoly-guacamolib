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
    <main className="w-[375px] min-h-[calc(100vh-52px)] bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="토론 주제를 입력해 주세요. ex) 물복 vs 딱복"
          {...register('title')}
          className="w-full pt-[26px] px-[20px] pb-[12px] text-[16px] text-grey-800 font-semibold border-b-[1px] border-grey-300"
        />
        <div className="py-[18px] px-[20px]">
          <textarea
            placeholder="주제에 대한 부가적인 설명이나 논객님은 어떤 생각을 가지고 있는지 적어주세요."
            {...register('content')}
            className="w-full resize-none mb-[30px] text-[14px]"
          />
          <label className="flex items-center justify-between mb-[10px]">
            <span className="text-[14px] text-grey-700">1번 선택지</span>
            <input
              type="text"
              placeholder="ex) 물복"
              {...register(`options.${0}`)}
              className="w-[265px] h-[46px] text-[14px] bg-grey-200 px-[10px]"
            />
          </label>
          <label className="flex items-center justify-between mb-[40px]">
            <span className="text-[14px] text-grey-700">2번 선택지</span>
            <input
              type="text"
              placeholder="ex) 딱복"
              {...register(`options.${1}`)}
              className="w-[265px] h-[46px] text-[14px] bg-grey-200 px-[10px]"
            />
          </label>
          <div className="flex justify-between">
            <div className="flex justify-center items-center w-[157px] h-[196px] bg-grey-300 rounded-[16px] text-grey-700 text-[14px]">
              물복
            </div>
            <div className="flex justify-center items-center w-[157px] h-[196px] bg-grey-300 rounded-[16px] text-grey-700 text-[14px]">
              딱복
            </div>
          </div>
          <button className="w-full h-[46px] bg-green-disabled rounded-full text-white text-[14px] mt-[184px]">
            생성하기
          </button>
        </div>
      </form>
    </main>
  )
}
