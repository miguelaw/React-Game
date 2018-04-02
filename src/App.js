import React, { Component } from "react";
import "./App.css";

import Header from './Header/header';
import Footer from './Footer/footer';
import MatchCard from "./Match-Card/match-card";
import matches from "./matchcards.json";


let score = 0;
let topScore = 0;
let introMessage = "Instructions: Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        score,
        topScore,
        introMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked){

            console.log ("Score: " + score);
            console.log ("Top Score: " + topScore);

            score = 0;
            introMessage = "Oops! You already clicked on that symbol! GAME OVER"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({introMessage});
            this.setState({ score });
            this.setState({matches});

        // Otherwise, if clicked = false, and the user keeps playing
        } else if (score < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            score++;
            
            introMessage = "Good Job! You haven't click on that one yet! Keep it going!";

            if (score > topScore){
                topScore = score;
                this.setState({ topScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({score});
            this.setState({introMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            score = 0;

            // Egg on the user to play again
            introMessage = "Wohoo!!! You WON the game!!! I bet you can't do it again!";
            topScore = 12;
            this.setState({ topScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({score});
            this.setState({introMessage});

        }
    };

    render() {
        return (
            <div className= "container-fluid">

            <div className="row">
              <div className="col-sm-12">
              < Header />
              </div>
            </div>
            <br/>

            <div className="row">
              <div className="col-sm-8 left font">
                <h3 className="scoreSummary">
                    {this.state.introMessage}
                </h3>
              </div>

              <div className="col-sm-4 center fontScore">
                <h3 className="scoreSummary">
                    Score: {this.state.score} | Top Score: {this.state.topScore} 
                </h3>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 center">
              
              {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
              ))}

              </div>
            </div>
            <br/>

            <div className="row">
              <div className="col-sm-12">
              < Footer />
              </div>
            </div>
    
            </div>
        );
    }
}

export default App;
