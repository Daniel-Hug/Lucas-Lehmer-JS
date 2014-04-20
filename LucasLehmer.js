var Big = require('./big.js/big.js');

// Don't let JS Bin disable any 'infinite' loops: // noprotect

// These functions determine if the mersenne number 2^p ? 1 is prime.
// Given an integer p they will return true or false.
// List of Mersenne primes:
// http://www.wolframalpha.com/input/?i=Mersenne%20primes


// Because of JS rounding error this method only works for p <= 19.
function lucasLehmer(p) {
	var s = 4;
	var m = Math.pow(2, p) - 1;
	for (var i = p - 2; i>0; i--) { // Repeat p - 2 times:
		if (0 === (s = (s * s - 2) % m)) return true;
	}
	return false;
}


// This version helps mitigate JS rounding error using big.js, but it can be slower.
// It works when p <= 127
// As of now, the p value of the largest known prime number is 57,885,161.
function lucasLehmerBig(p) {
	var s = new Big(4);
	var m = new Big(2).pow(p).minus(1);
	for (var i = p - 2; i>0; i--) { // Repeat p - 2 times:
		if (
			( s = s.pow(2).minus(2).mod(m) ).eq(0)
		) return true;
	}
	return false;
}


// Benchmarks:
console.time('lucasLehmer p=19');
console.log(lucasLehmer(19));
console.timeEnd('lucasLehmer p=19');

console.time('lucasLehmerBig p=19');
console.log(lucasLehmerBig(19));
console.timeEnd('lucasLehmerBig p=19');

console.time('lucasLehmerBig p=127');
console.log(lucasLehmerBig(127));
console.timeEnd('lucasLehmerBig p=127');

console.time('lucasLehmerBig p=500');
console.log(lucasLehmerBig(500));
console.timeEnd('lucasLehmerBig p=500');

console.time('lucasLehmerBig p=521');
console.log(lucasLehmerBig(521));
console.timeEnd('lucasLehmerBig p=521');