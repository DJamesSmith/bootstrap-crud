import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function Edit() {
  const {id}=useParams()
    const [data, setData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            city: ''
        }
    )
    const [error, setError] = useState({})

    useEffect(()=>{
      loadUsers()
    },[])

    const validation = () => {
        let error = {}
        if (!data.name) {
            error.name = '**please enter your name'
        }
        if (!data.email) {
            error.email = '**please enter your email'
        }
        if (!data.phone) {
            error.phone = '**please enter your phone number';
        }
        if (!data.city) {
            error.city = '**please enter your city'
        }
        return error;
    }

    const dataHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })

        if (name === 'name') {
            if (value.length === 0) {
                setError({ ...error, name: '**please enter your name' });
                setData({
                    ...data,
                    name: ''
                })
            } else {
                setError({ ...error, name: '' })
                setData({
                    ...data,
                    name: value
                })
            }
        }
        if (name === 'email') {
            if (value.length === 0) {
                setError({
                    ...error,
                    email: '**please enter your email'
                })
                setData({
                    ...data,
                    email: ''
                })
            } else {
                setError({
                    ...error,
                    email: ''
                })
                setData({
                    ...data,
                    email: value
                })
            }
        }
        if (name === 'phone') {
            if (value.length === 0) {
                setError({
                    ...error,
                    phone: '**please enter your email'
                })
                setData({
                    ...data,
                    email: ''
                })
            } else {
                setError({
                    ...error,
                    phone: ''
                })
                setData({
                    ...data,
                    phone: value
                })
            }
        }
        if (name === 'city') {
            if (value.length === 0) {
                setError({
                    ...error,
                    city: '**please enter your email'
                })
                setData({
                    ...data,
                    city: ''
                })
            } else {
                setError({
                    ...error,
                    city: ''
                })
                setData({
                    ...data,
                    city: value
                })
            }
        }

    }


    const formSubmit = async(e) => {
        e.preventDefault();
        console.log(data)
        setError(validation())
        await axios.put(`http://localhost:3002/users/${id}`,data)
    }

    const loadUsers=async()=>{
    const api =await axios.get(`http://localhost:3002/users/${id}`)
    setData(api.data)
    }

    return (
        <div style={{ margin: 'auto', width: '800px' }}>
            <form onSubmit={formSubmit}>
                <label htmlFor="exampleInputEmail1">Name :</label>
                <input
                    type="text"
                    className="form-control"
                    name='name'
                    value={data.name}
                    onChange={dataHandle}
                />
                <span style={{ color: 'red' }}>{error.name}</span>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email :</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        value={data.email}
                        onChange={dataHandle}
                    />
                    <span style={{ color: 'red' }}>{error.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Phone :</label>
                    <input
                        type="text"
                        className="form-control"
                        name='phone'
                        value={data.phone}
                        onChange={dataHandle}
                    />
                    <span style={{ color: 'red' }}>{error.phone}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">City :</label>
                    <input
                        type="text"
                        className="form-control"
                        name='city'
                        value={data.city}
                        onChange={dataHandle}
                    />
                    <span style={{ color: 'red' }}>{error.city}</span>
                </div>

                <button type="submit" className="btn btn-warning" >
                    Edit User
                </button>
            </form>

        </div>
    )
}

