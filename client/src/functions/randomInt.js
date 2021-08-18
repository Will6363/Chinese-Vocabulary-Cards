function randomInt(min, max) {
  if (typeof max == 'undefined') {
    // one param defined
    max = min;
    min = 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default randomInt;