import { useMutation } from '@tanstack/react-query'

import { deleteTopic } from '@/lib/topics'
import { Dialog } from '@/components/shared/Dialog'
import { useRouter } from 'next/navigation'

type Props = {
  dialog: { isOpen: boolean; open: () => void; close: () => void }
  topicId: string
}

export default function TopicDeleteDialog({ dialog, topicId }: Props) {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      router.push('/')
    },
  })

  return (
    <Dialog.Root {...dialog}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <p>
            주제를 <span>삭제</span>하시겠습니까?
          </p>
          <div>
            <Dialog.Close>취소</Dialog.Close>
            <button onClick={() => mutate(topicId)}>삭제</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
