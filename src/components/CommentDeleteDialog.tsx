import { useMutation } from '@tanstack/react-query'

import { commentKey, deleteComment } from '@/lib/comments'
import { Dialog } from '@/components/shared/Dialog'
import { queryClient } from './Providers'

type Props = {
  dialog: { isOpen: boolean; open: () => void; close: () => void }
  topicId: string
  commentId: string
}

export default function CommentDeleteDialog({
  dialog,
  topicId,
  commentId,
}: Props) {
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(commentKey.list(topicId))
    },
  })

  return (
    <Dialog.Root {...dialog}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <p>
            댓글을 <span>삭제</span>하시겠습니까?
          </p>

          <div>
            <Dialog.Close>취소</Dialog.Close>
            <button onClick={() => mutate(commentId)}>삭제</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
