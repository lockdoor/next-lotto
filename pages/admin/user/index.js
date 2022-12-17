import React, {useState, useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { AiOutlineUserAdd } from "react-icons/ai";
import FormCreateUser from "../../../components/admin/user/formCreateUser";
import FormEditUser from "../../../components/admin/user/formEditUser";
import UsersTable from "../../../components/admin/user/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormCreateUser } from '../../../redux/userSlice'

export default function UsersPage() {

  const formCreateUserState = useSelector(state=>state.user.formCreateUserState)
  const formEditUserState = useSelector(state=>state.user.formEditUserState)
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()

  const [lottoCurrent, setLottoCurrent] = useState("")
  useEffect(() => {
    setLottoCurrent(JSON.parse(localStorage.getItem('lottoCurrent')))
  }, [])

  const actionIcon = (
    <AiOutlineUserAdd onClick={() => dispatch(toggleFormCreateUser())} />
  );

  return (
    <Layout title={'admin User page'} actionIcon={actionIcon}>

      {/* form create user */}
      {formCreateUserState && <FormCreateUser />}

      {/* form edit user */}
      {formEditUserState && <FormEditUser user={user} />}

      {/* show user list */}
      <UsersTable lottoCurrent={lottoCurrent}/>

    </Layout>
    
  )
}