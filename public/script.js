<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Probabilistic Learning Task</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            background-color: #2d2d2d;
        }

        #start-screen, #instruction-screen {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
        }

        #start-screen input {
            margin-top: 20px;
        }

        #game-container {
            text-align: center;
        }

        .fractal {
            max-width: 300px;
            height: auto;
            margin: 0 20px;
            display: inline-block;
        }

        #feedback, #points {
            display: none;
            font-size: 24px;
            margin-top: 20px;
        }

        #instruction {
            display: none;
            font-size: 20px;
            margin-bottom: 20px;
            color: white;
        }

        #fixation-cross {
            font-size: 24px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            color: white;
        }

        .indicator {
            width: 50px;
            height: 300px;
            background-color: orange;
            display: none;
            position: absolute;
        }

        #left-indicator {
            right: calc(60% + 160px);
        }

        #right-indicator {
            left: calc(60% + 160px);
        }

        .positive-feedback {
            color: green;
        }

        .negative-feedback {
            color: red;
        }

        #points {
            color: white;
        }
    </style>
</head>

<body>

<div id="start-screen">
    Please enter your unique Participant Record ID and then press ENTER
    <input type="text" id="participant-id">
</div>

<div id="instruction-screen" style="display: none;">
   <p>Welcome to the game!</p>
    
    <p>You will be presented with an image on the left and one on the right. You will be asked to pick one. Picking an image wins you money, but one image gives you more money than the other.</p>

    <p>NOTE: the image which gives you more money may SWITCH as the game continues!</p>

    <p>Your goal is to win as much money as possible.</p> 

    <p>When you are ready to begin, please press "1" on your keyboard to start the game</p>
</div>

<div id="game-container" style="display: none;">
    <div id="instruction">Pick the left or right image to win money!</div>
    <div id="fractals">
        <div class="indicator" id="left-indicator"></div>
        <img src="https://raw.githubusercontent.com/maxsupergreenwald/PRLResources/main/resources/Fractal1.png" class="fractal" id="fractal1">
        <img src="https://raw.githubusercontent.com/maxsupergreenwald/PRLResources/main/resources/Fractal13.png" class="fractal" id="fractal2">
        <div class="indicator" id="right-indicator"></div>
    </div>
    <div id="feedback"></div>
    <div id="points">Winnings: 0</div>
</div>

<div id="fixation-cross">+</div>

<div id="completion-message" style="display: none;">
    Task complete! Thank you for your time. You will be redirected back to RedCap soon.
    <a href="#" id="downloadLink" style="display: none;">Download Results</a>
</div>

<script>
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
            this.timeout = setTimeout(() => this.endTrial(-999, 0, 5000), 5000);
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
            const trialData = { //This block of code shows how data is handled for each trial; all the below variables are added to the object trialData for each individual trial
                participantId,
                choice,
                outcome,
                totalPoints: this.totalPoints,
                rewardProbFractal1: fractal1,
                rewardProbFractal2: fractal2,
                decisionTime
            };
            this.trials.push(trialData); //the trials property of the game object is an array that stores the data for each trial as the user progresses through the task. The game.trials array is initialized as an empty array. After each trial, an object containing the trial data is pushed to the game.trials array.

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
                }, 1500);
            }, 2000);
        },
        startNextTrial() {
            if (this.trials.length === this.trialLimits.reduce((a, b) => a + b, 0)) {
                if (window.parent !== window) {
                    window.parent.postMessage({
                        type: 'labjs.data',
                        json: JSON.stringify(this.trials)
                    }, '*');
                }
                document.getElementById('completion-message').style.display = 'block';
                document.getElementById('game-container').style.display = 'none';
            } 
                //const json = JSON.stringify(this.trials, null, 2); 
                //const blob = new Blob([json], {type: "application/json"}); 
                //const url = URL.createObjectURL(blob); 
                //const downloadLink = document.getElementById('downloadLink');
                //downloadLink.href = url;
                //downloadLink.download = 'results.json';
                //downloadLink.style.display = 'block'; //Thes commented out lines take the JSON string and make  it accessible by a download link. 
                 else if (this.trials.length === this.trialLimits.slice(0, this.currentProbIndex + 1).reduce((a, b) => a + b, 0)) {
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
</script>

</body>

</html>
