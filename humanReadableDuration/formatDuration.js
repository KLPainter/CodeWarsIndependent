function formatDuration(secondsRaw) {

  if (secondsRaw === 0) return 'now';
  secondsByRef = [secondsRaw];

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInYear = secondsInDay * 365;

  function Unit(secondsByRef, conversion, label) {
    this.value = Math.floor(secondsByRef[0] / conversion);
    this.label = this.value > 1 ? label + 's' : label;
    secondsByRef[0] -= this.value * conversion;
  }

  const years = new Unit(secondsByRef, secondsInYear, 'year');
  const days = new Unit(secondsByRef, secondsInDay, 'day');
  const hours = new Unit(secondsByRef, secondsInHour, 'hour');
  const minutes = new Unit(secondsByRef, secondsInMinute, 'minute');
  const seconds = new Unit(secondsByRef, 1, 'second');
  
  const duration = [years, days, hours, minutes, seconds];
  return duration.filter(el => el.value > 0)
                 .map(el => el.value + ' ' + el.label)
                 .join(', ')
                 .replace (/(, )([^,]*)$/, ' and $2')
}

console.log (formatDuration(3662))