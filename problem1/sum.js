var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = n; i > 0; i--) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  let sum = 0;
  return (sum = (n * (n + 1)) / 2);
};

var sum_to_n_c = function (n) {
  let sum = 0;

  if (n === 1) {
    return 1;
  }
  return (sum = n + sum_to_n_c(n - 1));
};

sum_to_n_a(5);
sum_to_n_b(5);
sum_to_n_c(5);
