import React from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { AiOutlineUserAdd } from "react-icons/ai";
import FormCreateUser from "../../../components/admin/users/formCreateUser";
import FormEditUser from "../../../components/admin/users/formEditUser";
import UsersTable from "../../../components/admin/users/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormCreateUser } from '../../../redux/userSlice'

export default function UsersPage() {

  const formCreateUserState = useSelector(state=>state.user.formCreateUserState)
  const formEditUserState = useSelector(state=>state.user.formEditUserState)
  const userId = useSelector(state=>state.user.userId)
  const dispatch = useDispatch()

  const actionIcon = (
    <AiOutlineUserAdd onClick={() => dispatch(toggleFormCreateUser())} />
  );

  return (
    <Layout title={'admin User page'} actionIcon={actionIcon}>

      {/* form create user */}
      {formCreateUserState && <FormCreateUser />}

      {/* form edit user */}
      {formEditUserState && <FormEditUser userId={userId} />}

      {/* show user list */}
      <UsersTable />

    </Layout>
    
  )
}