import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST() {
    (await draftMode()).disable()
    redirect('/')
}
