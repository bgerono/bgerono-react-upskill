import React, { FC } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

interface IBackdrop {
  isOpen: boolean
}

export const BackdropLoader: FC<IBackdrop> = ({ isOpen }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
