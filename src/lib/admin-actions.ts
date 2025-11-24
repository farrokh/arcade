export async function logoutAdmin() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  
  cookieStore.delete('admin_session')
  
  return { success: true }
}
