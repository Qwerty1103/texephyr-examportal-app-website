import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';

function StatsCard(props) {
    let players = props.grpMem.map((player) => {
        return (
            <div className='singlePlayer'>
                <div className='playerTableCol number'>
                    {props.number}
                </div>
                <div className='playerTableCol idCol'>
                    {player.id}
                </div>
                <div className='playerTableCol'>
                    {player.name}
                </div>
                <div className='playerTableCol'>
                    {player.college}
                </div>
                <div className='playerTableCol'>
                    {player.email}
                </div>
                <div className='playerTableCol phoneCol'>
                    {player.phone}
                </div>
                <div className='viewProofBtnCol'>
                    <a href={`https://texephyr.live/static/proofs/${player.proof}`} target='_blank'>
                        <button className='viewProofBtn'> View ID Proof </button>
                    </a>
                </div>
            </div>
        )
    })
    return (
        <div className='statsCard'>
            {players}
        </div>
    )
}

export default StatsCard
