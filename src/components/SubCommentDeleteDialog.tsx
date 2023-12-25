import { useMutation } from '@tanstack/react-query'
import { subCommentKey } from '@/lib/subComments'
import { Dialog } from '@/components/shared/Dialog'
import { queryClient } from './Providers'
import { deleteComment } from '@/lib/comments'
import type { SubComment } from '@/lib/subComments'

type Props = {
  dialog: { isOpen: boolean; open: () => void; close: () => void }
  subCommentId: SubComment['id']
  parentCommentId: SubComment['parentCommentId']
}

export default function SubCommentDeleteDialog({
  dialog,
  subCommentId,
  parentCommentId,
}: Props) {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(subCommentKey.listOf(parentCommentId))
      dialog.close()
    },
  })

  return (
    <Dialog.Root {...dialog}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <p>
            대댓글을 <span>삭제</span>하시겠습니까?
          </p>
          <div>
            <Dialog.Close>취소</Dialog.Close>
            <button onClick={() => mutate(subCommentId)} disabled={isLoading}>
              삭제
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
