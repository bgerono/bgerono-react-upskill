import React, { FC, useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { IToastMsgContext, ToastMsgContext } from '../../context/toast-msg-context'
import { MsgTypeEnum } from '../../models/invoice.model'

export const ToastMsg: FC = () => {
  const { toastMsgState, dispatch } = useContext(ToastMsgContext) as IToastMsgContext
  const { type, msg, isOpen } = toastMsgState
  const autoHideDuration = 6000

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: MsgTypeEnum.hide })
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={`${type}`} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  )
}
