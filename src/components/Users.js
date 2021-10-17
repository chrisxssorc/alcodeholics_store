import React, { useEffect } from 'react';
import { getAllUsers } from '../api/index';
import { Card, CardContent, Typography } from '@mui/material';

const Users = ({users, setUsers}) => {
    useEffect(() => {
        getAllUsers()
        .then((users) => {
            setUsers(users);
        })
        .catch(console.error);
    }, []);

    return (
        <div className="usersList">
            {users.map((user, index) => {
                console.log(user)
                return (
                    <div className="userCard" id={index}>
                        <Card variant="outlined" sx={{margin: "10px", padding: "5px"}}>
                            <CardContent>
                                <Typography variant="h5">
                                    Username: {user.username}
                                </Typography>
                                <Typography variant="subtitle1">
                                    ID# {user.id}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Status: {user.isAdmin ? "Admin" : "User"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Users;