function shuffle(array) {
    var m = array.length, t, i;
    var newArray = array
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = newArray[m];
      newArray[m] = newArray[i];
      newArray[i] = t;
    }
  
    return newArray;
  }

  export default shuffle;