import { IToastMsgAction, IToastMsgState, MsgTypeEnum } from '../models/invoice.model'

export const toastMsgReducer = (state: IToastMsgState, action: IToastMsgAction): IToastMsgState => {
  switch (action.type) {
    case MsgTypeEnum.error: {
      return { type: MsgTypeEnum.error, msg: action.msg, isOpen: true }
    }
    case MsgTypeEnum.success: {
      return { type: MsgTypeEnum.success, msg: action.msg, isOpen: true }
    }
    case MsgTypeEnum.warning: {
      return { type: MsgTypeEnum.warning, msg: action.msg, isOpen: true }
    }
    case MsgTypeEnum.info: {
      return { type: MsgTypeEnum.info, msg: action.msg, isOpen: true }
    }
    case MsgTypeEnum.hide: {
      return { ...state, isOpen: false }
    }
  }

  return state
}
