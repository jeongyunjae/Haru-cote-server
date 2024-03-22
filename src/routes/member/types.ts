/**
    @description 하루코테 멤버
   */
export type ProblemMemberType =
  | '윤재'
  | '가윤'
  | '진욱'
  | '지은'
  | '사라'
  | '민지'
  | ''

export type MemberType = {
  member_id: number
  member_name: ProblemMemberType
}
