function foo(inputArray) {
  const map = {};
  const intersection = [];
  inputArray.forEach((numbers) => {
    new Set(numbers).forEach((number) => {
      if (map[number]) {
        map[number]++;
      } else {
        map[number] = 1;
      }
    });
  });

  for (const key in map) {
    if (map[key] === inputArray.length) {
      intersection.push(+key);
    }
  }
  return intersection;
}

console.log(
  foo([
    [2, 2, 3],
    [3, 4],
  ])
);
console.log(foo([[8, 6, 7], [5], [6, 5]]));
