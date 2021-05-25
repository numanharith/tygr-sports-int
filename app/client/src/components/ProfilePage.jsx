import React from 'react'

export const ProfilePage = ({ user }) => {
    if (user !== null) {
        return (
            <div>
                <div className="row">
                    <div className="col-8">
                        <h1>Bookmarks</h1>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {user.user.users_bookmarks.map((bm) => 
                                <div className="col">
                                    <div className="card">
                                        <img src={bm.pitch.imgurl} alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{bm.pitch.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-4">
                        <h1>Account</h1>
                        <h4><strong>Name: </strong>{user.user.first_name} {user.user.last_name}</h4>
                        <h4><strong>Email: </strong>{user.user.email}</h4>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Please login.</h1>
    }
}