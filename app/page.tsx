
import { createClient } from './utils/supabase/sever'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: departments } = await supabase.from('departments').select()

  return (
    <ul>
      {departments?.map((department, index) => (
        <li key={index}>{department?.name}</li>
      ))}
    </ul>
  )
}
