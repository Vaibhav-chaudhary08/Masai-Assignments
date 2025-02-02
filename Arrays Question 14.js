let scores = [35, 50, 45, 92, 30, 85, 60, 20, 95, 70];

for (let i = 0; i < scores.length; i++) {
    if (scores[i] < 40) {
        scores[i] += 20;
    }
    if (scores[i] > 90) {
        scores[i] = 90;
    }
}

let passCount = 0;
for (let score of scores) {
    if (score >= 50) {
        passCount++;
    }
}

console.log(`Number of students who passed: ${passCount}`);

console.log("Final adjusted scores:", scores);
