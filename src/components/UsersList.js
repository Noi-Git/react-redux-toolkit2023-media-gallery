import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useThunk } from '../hooks/use-thunk'
import Button from './Button'
import { fetchUsers, addUser } from '../store'
import Skeleton from './Skeleton'

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

  const { data } = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  if (isLoadingUsers) {
    return <Skeleton times={6} className='h-10 w-full' />
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>
  }

  const renderdUsers = data.map((user) => {
    return (
      <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
    )
  })

  const handleUserAdd = () => {
    doCreateUser()
  }

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {/* when 'isCreatingUser' is true --- apply these style */}
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && 'Error creating user...'}
      </div>
      <div>{renderdUsers}</div>
    </div>
  )
}

export default UsersList
