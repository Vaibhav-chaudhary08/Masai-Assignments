function timer(duration, onComplete) {
  setTimeout(() => {
    onComplete(`Timer of ${duration} ms finished`);
  }, duration);
}

timer(2000, (message) => {
  console.log(message);
});

timer(1000, (message) => {
    console.log("another timer: " + message);
});

console.log("timers started");
