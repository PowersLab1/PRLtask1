// Modify these variables for the inter-trial-interval, feedback display time, and time until timeout
const interTrialInterval = 500; // change back to 750 Time in milliseconds for the fixation cross inter-trial-interval
const feedbackDisplayTime = 1500; // change back to 3000 Time in milliseconds for the feedback display
const timeoutDuration = 4000; // change back to 5000 Time in milliseconds until the timeout is active
const participantIdInput = document.getElementById('participant-id');
const startScreen = document.getElementById('start-screen');
const instructionScreen = document.getElementById('instruction-screen');
let participantId = '';

function shuffleArray(array) { //shuffles the fractal positions; if not working suspect we need more than array i and j
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
} 

participantIdInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && participantIdInput.value.trim() !== '') {
        participantId = participantIdInput.value.trim();
        startScreen.style.display = 'none';
        instructionScreen.style.display = 'block';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === '1' && instructionScreen.style.display === 'block') {
        instructionScreen.style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        game.startTrial();
    }
});

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
    trialLimits: [5, 5, 5, 5, 5],//change back to [55, 45, 20, 20, 20]
    timeout: null,
    keydownHandler: null,
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
        this.timeout = setTimeout(() => this.endTrial(-999, 0, timeoutDuration), timeoutDuration);
        document.addEventListener('keydown', this.keydownHandler);
    },
    endTrial(choice, outcome, decisionTime) {
        clearTimeout(this.timeout);
        document.removeEventListener('keydown', this.keydownHandler);
       
        // Choose the correct indicator based on the choice
        let indicatorId;
        if (choice === 1) {
            indicatorId = 'left-indicator';
        } else if (choice === 2) {
            indicatorId = 'middle-indicator';
        } else { // choice === 3
            indicatorId = 'right-indicator';
        }
    
        const indicator = document.getElementById(indicatorId);
        indicator.style.display = 'inline-block';
    // endTrial(choice, outcome, decisionTime) {
    //     clearTimeout(this.timeout);
    //     document.removeEventListener('keydown', this.keydownHandler);
        
    //     const indicator = document.getElementById(choice === 1 ? 'left-indicator' : 'right-indicator');
    //     indicator.style.display = 'inline-block';
        setTimeout(() => {
            indicator.style.display = 'none';
            this.showFeedback(choice, outcome, decisionTime);
        }, 250);
    },
    showFeedback(choice, outcome, decisionTime) {
    const {fractal1, fractal2, fractal3} = this.rewardProbs[this.currentProbIndex];
    const trialData = {
        participantId,
        choice,
        outcome,
        totalPoints: this.totalPoints,
        rewardProbFractal1: fractal1,
        rewardProbFractal2: fractal2,
        rewardProbFractal3: fractal3, // Added line for fractal3 probability
        decisionTime
    };
    this.trials.push(trialData);

        document.getElementById('fractals').style.display = 'none';
        document.getElementById('instruction').style.display = 'none';
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('points').innerText = `Winnings: ${this.totalPoints}`;
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
        clearTimeout(game.timeout); // Clear the timeout to avoid end of trial due to timeout
        // Determine the choice based on the key pressed
        const choice = event.key === "1" ? 1 : (event.key === "2" ? 2 : 3);
        // Get the reward probabilities for the current trial
        const {fractal1, fractal2, fractal3} = game.rewardProbs[game.currentProbIndex];
        // Determine the probability based on the chosen fractal
        const prob = choice === 1 ? fractal1 : (choice === 2 ? fractal2 : fractal3);
        // Calculate the outcome: 1 for reward, 0 for no reward
        const outcome = Math.random() < prob ? 1 : 0;
        // Calculate the decision time
        const decisionTime = Date.now() - game.trialStart;
        // End the trial with the choice, outcome, and decision time
        game.endTrial(choice, outcome, decisionTime);
    }
};

// game.keydownHandler = (event) => {
//     if (game.currentState === "choosing" && (event.key === "1" || event.key === "2")) {
//         clearTimeout(game.timeout);
//         const choice = event.key === "1" ? 1 : 2;
//         const {fractal1, fractal2} = game.rewardProbs[game.currentProbIndex];
//         const prob = choice === 1 ? fractal1 : fractal2;
//         const outcome = Math.random() < prob ? 1 : 0;
//         const decisionTime = Date.now() - game.trialStart;
//         game.endTrial(choice, outcome, decisionTime);
//     }
// };
</script>

</body>

</html>