// カラムの取得条件
export const selectSettingColumns = {
  isMuted: true,
  volume: true,
  workSec: true,
  restSec: true,
  longRestSec: true,
  workingSound: true,
  bgImage: true,
}

export const selectUserColumns = {
  name: true,
  email: true,
}

export const selectRecordColumns = {
  workCount: true,
  workTime: true,
}

export const selectTodoColumns = {
  id: true, 
  title: true,
  deadline: true,
  isCompleted: true,
  completedAt: true,
}
