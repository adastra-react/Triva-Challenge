import React from "react";
import { Link } from 'react-router-dom';
import './Quiz.css';


function Quiz({
    currentQuestion,
    setCurrentQuestion,
    showScore,
    setShowScore,
    score,
    setScore
 }) {

    let StoredResults = localStorage.getItem('TrivaResults')

    let ParsedResults = JSON.parse(StoredResults);

    return (
        // Ternary below that displays the show score screen when the quiz is completed.
        <>
        {showScore ? (
        <div className='answer_container'>
            <div className="answer_inner_container">
             <h2>You scored <br /> {score}  / {ParsedResults.length}</h2> 
             <div>
                {ParsedResults.map((answer, index) => {
                    return(
                        <div key={index} className="answer_text_container" >
                            <div className="answer_cont" >
                                <p className="answer_txt" dangerouslySetInnerHTML={{__html:answer.correct_answer}}/>
                            </div>
                            
                            <div className="question_cont" >
                                <p className="answer_txt" dangerouslySetInnerHTML={{__html:answer.question}}/>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* This button resets all the state and makes a new request after 500ms */}
            <Link to="/" >
                <button onClick={() => {
                    setShowScore(false);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 500)
                }} className="restart_button" >PLAY AGAIN?</button>
            </Link>     
            </div>
        </div>
        ) : (
        <div className="quiz_container">
                <div className="quiz_inner_container">
                    <h2>{ParsedResults[currentQuestion].category}</h2>

                    <div className="question_box_container">
                        <div className="question_box" >
                            <p dangerouslySetInnerHTML={{__html:ParsedResults[currentQuestion].question}} />
                        </div>
                        <p>{currentQuestion + 1} out of 10</p>
                    </div>

                    <div className="answer_button_container">
                        {/*Upon click, the currectQuestion state is incremented by 1 and displays the next question,
                            if the answer is correct, the score state is incremented by one */}
                        <button value="True" onClick={() => {

                            const isCorrect = 'True';

                            if(isCorrect === ParsedResults[currentQuestion].correct_answer){
                                setScore(score + 1);
                        
                                const nextQuestion = currentQuestion + 1;
                                if (nextQuestion < ParsedResults.length) {
                                    setCurrentQuestion(nextQuestion);
                                } else {
                                    setShowScore(true);
                                }
                            } else {
                                const nextQuestion = currentQuestion + 1;
                                if (nextQuestion < ParsedResults.length) {
                                    setCurrentQuestion(nextQuestion);
                                } else {
                                    setShowScore(true);
                                    setCurrentQuestion(0)
                                }
                            }
                        }} 
                        >
                            True
                        </button>


                        {/*Upon click, the currectQuestion state is incremented by 1 and displays the next question,
                            if the answer is correct, the score state is incremented by one */}
                        <button 
                        onClick={() => {
                            const isCorrect = 'False';

                            if(isCorrect === ParsedResults[currentQuestion].correct_answer){
                                setScore(score + 1);
                        
                                const nextQuestion = currentQuestion + 1;
                                if (nextQuestion < ParsedResults.length) {
                                    setCurrentQuestion(nextQuestion);
                                } else {
                                    setShowScore(true);
                                }
                            } else {
                                const nextQuestion = currentQuestion + 1;
                                if (nextQuestion < ParsedResults.length) {
                                    setCurrentQuestion(nextQuestion);
                                } else {
                                    setShowScore(true);
                                    setCurrentQuestion(0)
                                }
                            }
                        }} 
                        >
                            False
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}

export default Quiz