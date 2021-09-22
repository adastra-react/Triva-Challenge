import React from 'react';
import { useHistory } from 'react-router'
import './Home.css';

function Home() {

    const history = useHistory();

    return (
        <div className="home_container">
            <div className="home_inner_container">
                <h2>Welcome to the Triva Challenge</h2>

                <p>You will be presented with 10 true or false questions.</p>

                <p>Can you score 100%?</p>
                        <button onClick={() => {
                                history.push('/quiz');
                            }} className="begin_btn"
                        >
                            BEGIN
                        </button>
            </div>
        </div>
    )
}

export default Home
