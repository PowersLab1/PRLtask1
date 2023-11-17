// Modify these variables for the inter-trial-interval, feedback display time, and time until timeout
const interTrialInterval = 500; // change back to 750 Time in milliseconds for the fixation cross inter-trial-interval
const feedbackDisplayTime = 1500; // change back to 3000 Time in milliseconds for the feedback display
const timeoutDuration = 4000; // change back to 5000 Time in milliseconds until the timeout is active
// const participantIdInput = document.getElementById('participant-id'); //REMOVED BECAUSE NO LONGER DOING PARTICIPANT ID SCREEN!
// const startScreen = document.getElementById('start-screen');
// const instructionScreen = document.getElementById('instruction-screen');
// let participantId = '';

document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('instruction-screen').style.display = 'block';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === '1' && document.getElementById('instruction-screen').style.display === 'block') {
            document.getElementById('instruction-screen').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            game.startTrial();
        }
    });

// participantIdInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' && participantIdInput.value.trim() !== '') {
//         participantId = participantIdInput.value.trim();
//         startScreen.style.display = 'none';
//         instructionScreen.style.display = 'block';
//     }
// });

document.addEventListener('keydown', (event) => {
    if (event.key === '1' && document.getElementById('instruction-screen').style.display === 'block') {
        instructionScreen.style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        game.startTrial();
    }
});

function shuffleFractals() {
    const fractalIDs = ['fractal1', 'fractal2', 'fractal3']; // Use IDs instead of numbers
    for (let i = fractalIDs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fractalIDs[i], fractalIDs[j]] = [fractalIDs[j], fractalIDs[i]];
    }
    return fractalIDs;
}
const game = {
    currentState: "choosing",
    trialStart: null,
    trials: [],
    totalPoints: 0,
    rewardProbs: [
        {fractal1: 0.80, fractal2: 0.20, fractal3: 0.50},
        {fractal1: 0.20, fractal2: 0.80, fractal3: 0.50},
        {fractal1: 0.80, fractal2: 0.20, fractal3: 0.50},
        {fractal1: 0.20, fractal2: 0.80, fractal3: 0.50},
        {fractal1: 0.80, fractal2: 0.20, fractal3: 0.50},
    ],
    currentProbIndex: 0,
    currentFractalPositions: ['fractal1', 'fractal2', 'fractal3'], // Initial order
    trialLimits: [10, 10, 10, 10, 10],//change back to [55, 45, 20, 20, 20]
    timeout: null,
    keydownHandler: null,

    updateFractalPositions() {
    const container = document.getElementById('fractals');
    const newOrder = this.currentFractalPositions.map(id => document.getElementById(id));
    newOrder.forEach(element => {
        if (element) {
            container.appendChild(element); // This moves the element to the end of the container
        } else {
            console.error('Fractal element not found:', element);
        }
    });
},
    // updateFractalPositions() { //this one seems to run into an issue because the fractal elements are removed from their container leading to the getElementByID method not finding them after shuffling
    // const container = document.getElementById('fractals');
    // console.log('Current fractals before update:', container.innerHTML); // New log
    // container.innerHTML = '';
    // this.currentFractalPositions.forEach(fractalID => {
    //     const fractalElement = document.getElementById(fractalID);
    //     if (fractalElement) {
    //         container.appendChild(fractalElement);
    //     } else {
    //         console.error('Fractal element not found:', fractalID);
    //     }
    // });
//},
//     updateFractalPositions() { //console error log here shows after shuffling, the updateFractalPositions function fails to find the shuffled fractals in the DOM. One possible cause could be that the shuffled IDs in this.currentFractalPositions do not match the actual IDs of the fractal elements in the DOM. 
//     const container = document.getElementById('fractals');
//     container.innerHTML = ''; // Clear existing fractals
//     this.currentFractalPositions.forEach(fractalID => {
//         const fractalElement = document.getElementById(fractalID);
//         if (fractalElement) {
//             container.appendChild(fractalElement); // Append only if the element is found
//         } else {
//             console.error('Fractal element not found:', fractalID);
//         }
//     });
// },


//     updateFractalPositions() { //ORIGINAL updateFractalPositions() -- removed cuz In this original function, fractals is an array of DOM elements, but this.currentFractalPositions now contains the IDs of the fractals (like 'fractal1', 'fractal2', 'fractal3') after modification. Therefore, fractals[position - 1] is not fetching the correct element.
//     const fractals = [document.getElementById('fractal1'), document.getElementById('fractal2'), document.getElementById('fractal3')];
//     const container = document.getElementById('fractals');
//     container.innerHTML = ''; // Clear existing fractals
//     this.currentFractalPositions.forEach(position => {
//         container.appendChild(fractals[position - 1]); // Append fractals in new order
//     });
// },
    switchProb() {
        this.currentProbIndex++;
    },
    startTrial() {
        this.currentState = "choosing";
        this.trialStart = Date.now();
        document.getElementById('fractals').style.display = 'block';
        document.getElementById('instruction').style.display = 'block';
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('points').style.display = 'none';
        document.getElementById('fixation-cross').style.display = 'none';
        this.timeout = setTimeout(() => this.endTrial(-999, -999, 0, timeoutDuration), timeoutDuration);//added another -999 for the 2 arguments at start of endTrial
        document.addEventListener('keydown', this.keydownHandler);
    },
    endTrial(keyChoice, fractalChoice, outcome, decisionTime) {
    clearTimeout(this.timeout);
    document.removeEventListener('keydown', this.keydownHandler);
   
    // Choose the correct indicator based on the choice
    let indicatorId;
    if (keyChoice === 1) {
        indicatorId = 'left-indicator';
    } else if (keyChoice === 2) {
        indicatorId = 'middle-indicator';
    } else { // keyChoice === 3
        indicatorId = 'right-indicator';
    }

    // If the participant didn't make a choice, set outcome to -999
    if (keyChoice === -999 && fractalChoice === -999) {
        outcome = -999;
        // Skipping indicator display
        this.showFeedback(keyChoice, fractalChoice, outcome, decisionTime);
        return; // Exit the function early
    }
    const indicator = document.getElementById(indicatorId);
    if (!indicator) {
        console.error('Indicator not found:', indicatorId); // New error log
        return; // Prevent further execution if indicator is null
    }
    indicator.style.display = 'inline-block';
    setTimeout(() => {
        indicator.style.display = 'none';
        this.showFeedback(keyChoice, fractalChoice, outcome, decisionTime);
    }, 250);
},

    // endTrial(keyChoice, fractalChoice, outcome, decisionTime) { //OG script w/o debugging code
    //     clearTimeout(this.timeout);
    //     document.removeEventListener('keydown', this.keydownHandler);
       
    //     // Choose the correct indicator based on the choice
    //     let indicatorId;
    //     if (keyChoice === 1) {
    //         indicatorId = 'left-indicator';
    //     } else if (keyChoice === 2) {
    //         indicatorId = 'middle-indicator';
    //     } else { // keyChoice === 3
    //         indicatorId = 'right-indicator';
    //     }
    
    //     const indicator = document.getElementById(indicatorId);
    //     indicator.style.display = 'inline-block';
   
    //     setTimeout(() => {
    //         indicator.style.display = 'none';
    //         this.showFeedback(keyChoice, fractalChoice, outcome, decisionTime);
    //     }, 250);
    // },
    showFeedback(keyChoice, choice, outcome, decisionTime) {
    const {fractal1, fractal2, fractal3} = this.rewardProbs[this.currentProbIndex];
    const trialData = {
        //participantId,
        keyChoice,
        choice,
        outcome,
        totalPoints: this.totalPoints,
        rewardProbFractal1: fractal1,
        rewardProbFractal2: fractal2,
        rewardProbFractal3: fractal3, // Added line for fractal3 probability
        decisionTime
    };
    console.log(trialData)
    this.trials.push(trialData);

        document.getElementById('fractals').style.display = 'none';
        document.getElementById('instruction').style.display = 'none';
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('points').innerText = `Winnings: $${this.totalPoints}`;
        document.getElementById('points').style.display = 'block';
        
        const feedback = document.getElementById("feedback");
        if (choice === -999) {
            feedback.innerText = "Too slow! You get $0";
        } else if (outcome) {
            feedback.classList.add('positive-feedback');
            feedback.innerText = "You get $0.75";
            this.totalPoints += 0.75;
        } else {
            feedback.classList.add('negative-feedback');
            feedback.innerText = "You get $0.25";
            this.totalPoints -= 0.25;
        }

        setTimeout(() => {
            feedback.classList.remove('positive-feedback');
            feedback.classList.remove('negative-feedback');
            feedback.style.display = 'none';
            document.getElementById('points').style.display = 'none';
            document.getElementById('fixation-cross').style.display = 'block';
            setTimeout(() => {
                this.startNextTrial();
            }, interTrialInterval);
        }, feedbackDisplayTime);
    },
    startNextTrial() {
        if (this.trials.length % 5 === 0) { // Every 5 trials, shuffle fractals
        this.currentFractalPositions = shuffleFractals();
        this.updateFractalPositions();
    }
        if (this.trials.length === this.trialLimits.reduce((a, b) => a + b, 0)) {
            console.log(this.trials);
            //if (window.parent == window) {
                console.log('in if statement for startNextTrial');
                window.postMessage({ //used to be window.parent.postMessage...
                    type: 'labjs.data',
                    json: JSON.stringify(this.trials)
                }, '*');
           // }
            document.getElementById('completion-message').style.display = 'block';
            document.getElementById('game-container').style.display = 'none';
        } else if (this.trials.length === this.trialLimits.slice(0, this.currentProbIndex + 1).reduce((a, b) => a + b, 0)) {
            this.switchProb();
        }
        this.startTrial();
    },
};

game.keydownHandler = (event) => {
        // Check if the current state is 'choosing' and if key '1', '2', or '3' is pressed
    if (game.currentState === "choosing" && (event.key === "1" || event.key === "2" || event.key === "3")) {
        clearTimeout(game.timeout);

        const keyChoice = parseInt(event.key); // Key pressed by the user
        const fractalChoice = game.currentFractalPositions[keyChoice - 1]; // Directly use the shuffled fractal ID

        // Get the reward probabilities for the current trial
        const { fractal1, fractal2, fractal3 } = game.rewardProbs[game.currentProbIndex];

        // Determine the probability based on the chosen fractal
        let prob;
        switch(fractalChoice) {
            case 'fractal1':
                prob = fractal1;
                break;
            case 'fractal2':
                prob = fractal2;
                break;
            case 'fractal3':
                prob = fractal3;
                break;
        }
        // Log the probability being used
        console.log(`Probability for ${fractalChoice}:`, prob);
        // Calculate the outcome: 1 for reward, 0 for no reward
        const outcome = Math.random() < prob ? 1 : 0;
        //calculate the decision time
        const decisionTime = Date.now() - game.trialStart;
        // End the trial with the key choice, actual fractal choice, outcome, and decision time
        game.endTrial(keyChoice, fractalChoice, outcome, decisionTime);
    }
};