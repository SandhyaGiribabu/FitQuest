
document.addEventListener('DOMContentLoaded', function () {
    const exercises = [
        {
            name: 'Push-ups',
            image: 'https://img.freepik.com/premium-vector/illustration-man-exercising-with-two-steps-pushups-image-man-training-his-muscles_403715-22.jpg',
            description: 'A basic upper body exercise to strengthen the chest, shoulders, and triceps.',
            calories: 10,
            duration: 10 // Duration in seconds
        },
        {
            name: 'Squats',
            image: 'https://img.freepik.com/premium-vector/workout-with-squat-jump-flat-design-illustration_207579-1463.jpg?w=740',
            description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
            calories: 12,
            duration: 5
        },
        {
            name: 'Lunges',
            image: 'https://samarpanphysioclinic.com/wp-content/uploads/2022/03/lunges-1200x1200.jpg',
            description: 'A lower body exercise to strengthen the legs and improve balance.',
            calories: 15,
            duration: 5
        },
        {
            name: 'Burpees',
            image: 'https://img.freepik.com/premium-vector/burpees-exercise-woman-workout-fitness-aerobic-exercises_476141-1406.jpg?w=900',
            description: 'A full body exercise that increases strength and aerobic capacity.',
            calories: 20,
            duration: 5
        },
        {
            name: 'Plank',
            image: 'https://img.freepik.com/premium-vector/woman-pose-doing-full-plank-color-vector-cartoon-icon-stay-home-isolated-white_206360-179.jpg?w=740',
            description: 'A core exercise that strengthens the abdominal muscles and lower back.',
            calories: 8,
            duration: 5
        }
    ];

    const exerciseContainer = document.getElementById('exercise-container');
    const exerciseDetails = document.getElementById('exercise-details');
    const startButton = document.getElementById('start-button');
    const circleProgress = document.getElementById('circle-progress');
    const circleSvg = document.getElementById('circle-svg');
    let currentExerciseIndex = 0;
    let exerciseInterval;
    let breakInterval;

    function displayExercise(exercise) {
        exerciseDetails.innerHTML = `
            <div class="exercise mb-4">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${exercise.image}" alt="${exercise.name}" style="height:200px; width: 200px; border-radius:1rem;">
                    </div>
                    <div class="col-md-8">
                        <h3>${exercise.name}</h3>
                        <p>${exercise.description}</p>
                        <p><strong>Calories Burnt:</strong> ${exercise.calories}</p>
                        <p><strong>Duration:</strong> ${exercise.duration} seconds</p>
                        <div id="timer" class="mt-2">Time Remaining: ${exercise.duration} seconds</div>
                    </div>
                </div>
            </div>
        `;
        const circumference = 2 * Math.PI * 90; // Calculate the circumference of the circle
        circleProgress.style.strokeDasharray = circumference;
        circleProgress.style.strokeDashoffset = circumference;
        circleSvg.style.display = 'block'; // Show the progress bar
    }

    function startTimer(exercise) {
        const timerElement = document.getElementById('timer');
        let timeRemaining = exercise.duration;
        const circumference = 2 * Math.PI * 90;
        const step = circumference / exercise.duration;

        function updateTimer() {
            if (timeRemaining > 0) {
                timeRemaining--;
                if (timerElement) {
                    timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;
                    circleProgress.style.strokeDashoffset = step * timeRemaining;
                }
            } else {
                clearInterval(exerciseInterval);
                setTimeout(() => {
                    displayBreak();
                }, 1000); // Short delay before showing the break message
            }
        }

        updateTimer(); // Initial call to set the first state
        exerciseInterval = setInterval(updateTimer, 1000); // Update every second
    }

    function displayBreak() {
        exerciseDetails.innerHTML = `
            <div class="break-message mb-4">
                <h3>Break Time!</h3>
                <p>Take a 10-second break before the next exercise.</p>
                <div id="break-timer" class="mt-2">Break Time Remaining: 10 seconds</div>
            </div>
        `;

        circleSvg.style.display = 'none'; // Hide the progress bar
        startBreakTimer();
    }

    function startBreakTimer() {
        const breakTimerElement = document.getElementById('break-timer');
        let breakTimeRemaining = 10;

        function updateBreakTimer() {
            if (breakTimeRemaining > 0) {
                breakTimeRemaining--;
                if (breakTimerElement) {
                    breakTimerElement.textContent = `Break Time Remaining: ${breakTimeRemaining} seconds`;
                }
            } else {
                clearInterval(breakInterval);
                currentExerciseIndex++;
                if (currentExerciseIndex < exercises.length) {
                    displayExercise(exercises[currentExerciseIndex]);
                    startTimer(exercises[currentExerciseIndex]);
                } else {
                    exerciseDetails.innerHTML = '<h2>Workout Complete!</h2>';
                }
            }
        }

        updateBreakTimer(); // Initial call to set the first state
        breakInterval = setInterval(updateBreakTimer, 1000); // Update every second
    }

    // Add click event listener to the start button
    startButton.addEventListener('click', function () {
        displayExercise(exercises[currentExerciseIndex]);
        startTimer(exercises[currentExerciseIndex]);
        startButton.style.display = 'none'; // Hide the start button after starting
    });
});
document.getElementById('login').addEventListener('click', function() {
    window.location.href = 'login1.html';
});
