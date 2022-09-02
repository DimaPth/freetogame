import { useAppSelector } from "./redux"

export const useAuth = () => {
  const {username, email, token, id} = useAppSelector(state => state.user);
  
  return {
    isAuth: !!email,
    username,
    email,
    token,
    id
  }
}