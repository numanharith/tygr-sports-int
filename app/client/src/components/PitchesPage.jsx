import React from 'react'

export const PitchesPage = ({ pitches, user }) => {

    if (user !== null && pitches !== null) {
        return (
            <div className="row">
                <h1>Pitches</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {pitches.map((pitch) => 
                        <div className="col">
                            <div className="card">
                                <img src={pitch.poster} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{pitch.name}</h5>
                                    <p className="card-text">{pitch.year}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return <h1>Please login.</h1>
    }
}