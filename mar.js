function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}


const randomNumber = Math.floor(Math.random() * 100) + 1;


if (isPrime(randomNumber)) {
    
} else {
    
}
