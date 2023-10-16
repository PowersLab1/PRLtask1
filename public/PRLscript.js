//Probabilistic Reversal Learning Task in JavaScript from ChatGPT4
//-----------------------------
//Please write a script in javascript that produces the following online probablistic learning task for participants to play on their computer.
//"this task requires trial-wise binary decisions between two fractal stimuli. On each trial, the same pair of fractal stimuli are presented (one on the left, one on the right corresponding to image 1 and image 2), each paired with a probability of giving a participant 10 points vs. costing the participant 10 points.  One image rewards participants 10 points 80% of the time while costing them 10 points 20% of the time; the other fractal rewards participants 10 points 20% of the time and costs them 10 points 80% of the time. The task starts by presenting the images on the screen. Then participants have a maximum of 4 s to make a decision (by pressing the “1” key to indicate the left image and the “2” key to indicate the right image), followed by a 5-second delay displaying the choice and a 2-second presentation of the decision outcome (correct or incorrect) with reward feedback (they either lose 10 points or win 10 points). If no response is made during the decision period, a time-out occurs and a screen saying "too slow!" is displayed for 8 s, instead of the delay and outcome screens. The across-trial task structure incorporates ‘switches’, or reversals, in a block-wise fashion in terms of which of the cues is most likely (80% probability) or least likely (20%) to be the correct, rewarded choice on that trial. The first 55 trials feature one stable set of reward contingencies between the two fractal options. Then, which fractal is more likely to lead to a reward is switched for the next 45 trials. Then it switches back for 20 trials. Then it switches again for 20 trials, and again one last time for 20 trials.  The task consists of 160 trials in total.”
//The script must produce an array at the end that will upload to a server. The array should contain a row for each trial and columns containing values of 1) which image the participant picked (1 or 2 for left versus right and -999 if they didn’t select anything), 2) whether their choice was rewarded or not (0 indicating they lost 10 points and 1 indicating they were rewarded 10 points), 3) the running total number of points the participant has, 4) the reward probability of fractal image 1 for that trial, 5) the reward probability of fractal image 2 for that trial, and 6) the time it took between presentation of the 2 fractal images and a decision being made (the participant hitting key 1 or 2). For the fractal images themselves please use https://github.com/Powers-Lab/Tasks/blob/4a88089bd4b32171714b643751bcdc3a2cfe186d/Psychedelic/PRL/html/resources/Fractal1.png and  https://github.com/Powers-Lab/Tasks/blob/4a88089bd4b32171714b643751bcdc3a2cfe186d/Psychedelic/PRL/html/resources/Fractal10.png for fractal 1 and fractal 2


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
    Please enter your unique Participant Record ID and then press enter
    <input type="text" id="participant-id">
</div>

<div id="instruction-screen" style="display: none;">
    Welcome to the game! 
    
    You will be repeatedly presented with an abstract images on the left and one on teh right. You will be asked to pick one.
    Picking an image may win you points, or it may cost you points.

    One image is more likely than the other to give you points than cost you points; you will need to figure out which!
    NOTE: the image which gives you more points may switch as the game continues!

    Your goal is to win as many points as possible. 

    When you are ready to begin, please press "1" on your keyboard to start the game
</div>

<div id="game-container" style="display: none;">
    <div id="instruction">Pick the left or right image to win points!</div>
    <div id="fractals">
        <div class="indicator" id="left-indicator"></div>
        <img src="https://raw.githubusercontent.com/maxsupergreenwald/PRLResources/main/resources/Fractal1.png" class="fractal" id="fractal1">
        <img src="https://raw.githubusercontent.com/maxsupergreenwald/PRLResources/main/resources/Fractal13.png" class="fractal" id="fractal2">
        <div class="indicator" id="right-indicator"></div>
    </div>
    <div id="feedback"></div>
    <div id="points">Points: 0</div>
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
            document.getElementById('points').innerText = `Points: ${this.totalPoints}`;
            document.getElementById('points').style.display = 'block';
            
            const feedback = document.getElementById("feedback");
            if (choice === -999) {
                feedback.innerText = "Too slow! You get 0 points";
            } else if (outcome) {
                feedback.classList.add('positive-feedback');
                feedback.innerText = "You win 10 points!";
                this.totalPoints += 10;
            } else {
                feedback.classList.add('negative-feedback');
                feedback.innerText = "You lose 10 points!";
                this.totalPoints -= 10;
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
                const json = JSON.stringify(this.trials, null, 2);
                const blob = new Blob([json], {type: "application/json"});
                const url = URL.createObjectURL(blob);
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = url;
                downloadLink.download = 'results.json';
                downloadLink.style.display = 'block';
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
</script>

</body>

</html>
