import React, {useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { AiOutlineUserAdd } from "react-icons/ai";
import FormCreateUser from "../../../components/admin/user/formCreateUser";
import FormEditUser from "../../../components/admin/user/formEditUser";
import UsersTable from "../../../components/admin/user/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormCreateUser } from '../../../redux/userSlice'
import { useRouter } from 'next/router';
import getLottoCurrent from '../../../lib/getLottoCurrent';
import { dateToInputValue } from '../../../lib/helper';

export default function UsersPage({lottoCurrent}) {
  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/user/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const formCreateUserState = useSelector(state=>state.user.formCreateUserState)
  const formEditUserState = useSelector(state=>state.user.formEditUserState)
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()

  const actionIcon = (
    <AiOutlineUserAdd id='btn-create-user' onClick={() => dispatch(toggleFormCreateUser())} />
  );

  return (
    <Layout title={'admin User page'} actionIcon={actionIcon} lottoCurrent={lotto}>

      {/* form create user */}
      {formCreateUserState && <FormCreateUser lottoCurrent={lotto}/>}

      {/* form edit user */}
      {formEditUserState && <FormEditUser user={user} lottoCurrent={lotto}/>}

      {/* show user list */}
      <UsersTable lottoCurrent={lotto}/>

    </Layout>
    
  )
}
export const getServerSideProps = async (context) => getLottoCurrent(context)


