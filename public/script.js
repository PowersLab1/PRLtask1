// Modify these variables for the inter-trial-interval, feedback display time, and time until timeout
const interTrialInterval = 750; // Time in milliseconds for the fixation cross inter-trial-interval
const feedbackDisplayTime = 1000; // Time in milliseconds for the feedback display
const timeoutDuration = 5000; // Time in milliseconds until the timeout is active
const participantIdInput = document.getElementById('participant-id');
const startScreen = document.getElementById('start-screen');
const instructionScreen = document.getElementById('instruction-screen');
let participantId = '';

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
        {fractal1: 0.75, fractal2: 0.25},
        {fractal1: 0.25, fractal2: 0.75},
        {fractal1: 0.75, fractal2: 0.25},
        {fractal1: 0.25, fractal2: 0.75},
        {fractal1: 0.75, fractal2: 0.25},
    ],
    currentProbIndex: 0,
    trialLimits: [55, 45, 20, 20, 20],
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
        
        const indicator = document.getElementById(choice === 1 ? 'left-indicator' : 'right-indicator');
        indicator.style.display = 'inline-block';
        
        setTimeout(() => {
            indicator.style.display = 'none';
            this.showFeedback(choice, outcome, decisionTime);
        }, 250);
    },
    showFeedback(choice, outcome, decisionTime) {
        const {fractal1, fractal2} = this.rewardProbs[this.currentProbIndex];
        const trialData = {
            participantId,
            choice,
            outcome,
            totalPoints: this.totalPoints,
            rewardProbFractal1: fractal1,
            rewardProbFractal2: fractal2,
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
    if (game.currentState === "choosing" && (event.key === "1" || event.key === "2")) {
        clearTimeout(game.timeout);
        
        const choice = event.key === "1" ? 1 : 2;
        const {fractal1, fractal2} = game.rewardProbs[game.currentProbIndex];
        const prob = choice === 1 ? fractal1 : fractal2;
        const outcome = Math.random() < prob ? 1 : 0;
        const decisionTime = Date.now() - game.trialStart;
        game.endTrial(choice, outcome, decisionTime);
    }
};
