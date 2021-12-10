export const handleFormatSecond = (seconds) => {
    let min = parseInt(seconds / 60);
    let sec = parseInt(seconds % 60);
    let displayMin = min < 10 ? '0' + min : min;
    let displaySec = sec < 10 ? '0' + sec : sec;
    return displayMin + ':' + displaySec;
  };

  export const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };