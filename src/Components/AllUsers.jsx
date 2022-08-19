import { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../Services/API'
import { Link } from 'react-router-dom'
import EditUser from './EditUser'

export default function AllUsers() {

    const [users, setUsers] = useState([])

    const getUsersDetails = async () => {
        let response = await getUsers()
        // console.log(response)
        setUsers(response.data)
    }

    useEffect(() => {
        getUsersDetails()
    }, [])

    const deleteUserData = async id => {
        await deleteUser(id)
        getUsersDetails()
    }

    return (
        <>
            <table className='table container-sm mt-5'>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Password </th>
                        <th> City </th>
                        <th> State </th>
                        <th> DOB </th>
                        <th> Action </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td> {user.id} </td>
                                <td> {user.name} </td>
                                <td> {user.email} </td>
                                <td> {user.phone} </td>
                                <td> {user.password} </td>
                                <td> {user.city} </td>
                                <td> {user.state} </td>
                                <td> {user.dob} </td>
                                <td>
                                    <Link to={`/edit/${user.id}`}> <button className='btn btn-primary' style={{ marginRight: '10px' }}> Edit </button> </Link>
                                    <button className='btn btn-danger' color='secondary' onClick={() => deleteUserData(user.id)}> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}