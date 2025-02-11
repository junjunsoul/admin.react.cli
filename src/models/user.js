import { useState } from 'react';
import { transferPost } from '@/authority/services'
import { history } from '@umijs/max';
export default function Page() {
  const [currentUser, setCurrentUser] = useState({});
  const [authority, setAuthority] = useState([]);
  async function logout() {
    const res = await transferPost('api.logout', {})
    if (res.code == 200) {
      history.push({
        pathname: '/user/login',
      })
      setCurrentUser({})
    }
  }
  async function fetchCurrent() {
    const res = await transferPost('api.getUserInfo', {})
    if (res.code == 200) {
      const data = res.data;
      let currentUser = data.user_info;
      let authority = data.auth_api_list.filter(item => item).map(path => path.toLocaleLowerCase());
      setCurrentUser(currentUser)
      setAuthority(authority)
    }
  }
  return {
    currentUser,
    authority,
    logout,
    fetchCurrent,
  }
}
