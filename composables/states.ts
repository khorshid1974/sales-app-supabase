export const useColor = () => useState<string>('color', () => 'pink')
export const useUser = () => useState<object>('user', () => ({ name: 'John Doe' }))
export const useAuthCookie = () => useCookie('auth_token_kh')
