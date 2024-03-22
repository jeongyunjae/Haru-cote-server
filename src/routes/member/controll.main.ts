import { client } from '@src/db/database'
import { MemberType } from './types'

export async function getMembers(ctx: any) {
  const getMembersQuery =
    'select id as member_id, name as member_name from members'

  try {
    const memberList: MemberType[] = (await client.query(getMembersQuery)).rows

    ctx.status = 200
    ctx.body = memberList
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.message = 'Server error'
    ctx.body = {
      message: 'server error',
    }
  }
}
