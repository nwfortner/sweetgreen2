

const textBlocking = (lines) => {

  // Create a result array with a length equal to the length of the input rows
  // and initialize it with empty strings.

  const resultArrayLength = lines[0].length;
  const resultArray = new Array(resultArrayLength).fill('');

  // Iterate over the input array and its contents from top to bottom
  // meaning all characters at index 0 are visited before the characters at
  // index 1 for each string in the input list.

  for (let i = 0; i < lines.length; i++) {

    for (let j = 0; j < lines[i].length; j++) {

      // Concatenate the character at index j for every string i
      // to the resultArray string at index j.

      resultArray[j] += lines[i][j];

    }

  }

  // Return the result array.

  return resultArray;

};

const testList1 = [
  'AAA',
  'BBB',
  'CCC',
];

const testList2 = [
  'A',
  'A',
  'A',
  'A',
  'A',
];

const testList3 = ['AAAAAAAAAAAAA'];

console.log(textBlocking(testList1), 'testList1');
console.log(textBlocking(testList2), 'testList2');
console.log(textBlocking(testList3), 'testList3');


class RaceAverage {
  constructor() {

    // Initialize RaceAverage class with class proerties.
    // Properties 'minutesInHour' and 'minutesInDay' will be used to convert
    // all time to minutes in the method 'avgMinutes'. The property 'raceStartMinutesOffset'
    // is the time not spent racing during the first day of the race due to the
    // start time being at 8 AM. This equals a loss of eight hours.

    this.minutesInDay = 1440;
    this.minutesInHour = 60;
    this.raceStartMinutesOffset = 8 * 60;
  }

  // Extract minutes from a single time string.

  getMinutes(timeString) {
    return +timeString.substring(3, 5);
  }

  // Extract the hours from a single time string and normalize the hours to a 24 hour period
  // beginning at 0.

  getHours(timeString) {
    let hours = +timeString.substring(0, 2);

    if (hours === 12) {
      hours = 0;
    }

    if (this.getAMorPM(timeString) === 'AM') {
      return hours;
    }

    return hours + 12;
  }

  // Extract weather the time in the time string is AM or PM.

  getAMorPM(timeString) {
    return timeString.substring(6, 8);
  }

  // Extract the number of fully completed days in the input timestring
  // subtracting one for the current day.

  getDaysCompleted(timeString) {
    return +timeString.substring(14) - 1;
  }

  // Extract the average time spent racing for all sailboats.

  avgMinutes(times) {

    // Reduce a list of timestrings to a number which represents the total
    // time in minutes spent racing for all sailboat's times in the input array.

    const raceTimesTotal = times.reduce((init, curr) => {

      const minutes = this.getMinutes(curr);
      const day = this.getDaysCompleted(curr);
      const hours = this.getHours(curr);

      const total = minutes + (hours * this.minutesInHour) + (day * this.minutesInDay) - this.raceStartMinutesOffset;

      return init + total;

    }, 0);

    // Calculate and return the average time racing for all sailboats rounded to the nearest integer.
    return Math.round(raceTimesTotal / times.length);

  }

}

const raceTimeList1 = [
  '12:00 PM, DAY 1',
  '12:01 PM, DAY 1',
];

const raceTimeList2 = [
  '02:00 PM, DAY 19',
  '02:00 PM, DAY 20',
  '01:58 PM, DAY 20',
];

const raceTimeList3 = [
  '12:00 AM, DAY 2',
];

const race = new RaceAverage();

console.log(race.avgMinutes(raceTimeList1), 'raceTimeList1');
console.log(race.avgMinutes(raceTimeList2), 'raceTimeList2');
console.log(race.avgMinutes(raceTimeList3), 'raceTimeList3');
