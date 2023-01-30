import React, { useEffect, useState } from 'react'
import { IUsers } from '../models/IUsers'
import { UsersService } from '../services/UsersService'
interface IState {
    loading: boolean,
    users: IUsers[],
    errorMSG: string
}

const Home: React.FC = () => {
    const [state, setState] = useState<IState>({
        loading: false,
        users: [] as IUsers[],
        errorMSG: ''
    })
    // network request
    useEffect(() => {
        setState({ ...state, loading: true })
        UsersService.getAllUsers().then(res => {
            // console.log("data is ", res.data)
            setState({
                ...state,
                loading: false,
                users: res.data
            })
        })
            .catch(err => {
                // console.log("error is " , err)
                setState({
                    ...state,
                    loading: false,
                    errorMSG: err.message
                })
            })
        //eslint-disable-next-line
    }, [])
    const{loading,users, errorMSG}= state
    return (
        <>
            <div>
                <h3>Data from API</h3>
                <hr />
                {errorMSG &&(<p>{errorMSG}</p>)}
                {loading &&(<p>{"Loading..."}</p>)}
                <table className="table"> 
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length>0 && users.map(user=>(
                                <tr key={user.id}>
                                    <td> {user.id} </td>
                                    <td> {user.name} </td>
                                    <td> {user.username} </td>
                                    <td> {user.email} </td>
                                </tr>
                            ))
                        } 
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Home