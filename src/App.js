import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Quiz from './components/Quiz/Quiz';
import Home from './components/Home/Home';


function App() {

  // Component state for data being used by the app.
  const [trivaResults, setTriviaResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  //Function that uses axio to send a get request to the server for the quiz results.
	const getTrivaQuestions = async () => {

		await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`)
		.then((response) => {
      localStorage.setItem('TrivaResults', JSON.stringify(response.data.results))

      let StoredResults = localStorage.getItem('TrivaResults')

      let ParsedResults = JSON.parse(StoredResults);

			setTriviaResults(ParsedResults);
			console.log(trivaResults);
		})
    .catch((err) => {
      alert("Error running quiz! :(")
    })
	}

  // Calls the getTrivaQuestions() fucntion upon page load
  useEffect(() => {
    getTrivaQuestions();
  }, []);

  return (
    <>
    <Router>
        <Switch>
        <Route path="/quiz">
          {/* App component state being passed to the Quiz component as props. */}
            <Quiz 
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              showScore={showScore}
              setShowScore={setShowScore}
              score={score}
              setTriviaResults={setTriviaResults}
              setScore={setScore}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </>
  )
}

export default App
