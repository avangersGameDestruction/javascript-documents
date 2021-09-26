function strengthResult(p) {
    if (p.length < 6 || p.length > 18) {
        return 'Passwords must be 6-18 characters';
    }
    var strength = checkStrength(p);
    switch (true) {
        case strength <= 30:
            return 'Password "' + p + '" (' + strength + ') is Very Weak';
            break;
        case strength > 30 && strength <= 35:
            return 'Password "' + p + '" (' + strength + ') is Weak';
            break;
        case strength > 35 && strength <= 50:
            return 'Password "' + p + '" (' + strength + ') is below Average';
            break;
        case strength > 50 && strength <= 60:
            return 'Password "' + p + '" (' + strength + ') is almost Good';
            break;
        case strength > 60 && strength <= 70:
            return 'Password "' + p + '" (' + strength + ') is Good';
            break;
        case strength > 70 && strength <= 80:
            return 'Password "' + p + '" (' + strength + ') is Very Good';
            break;
        case strength > 80 && strength <= 90:
            return 'Password "' + p + '" (' + strength + ') is Strong';
            break;
        case strength > 90 && strength <= 100:
            return 'Password "' + p + '" (' + strength + ') is Very Strong';
            break;
        default:
            return 'Error';
    }
}

function strengthMap(w, arr) {
    var c = 0;
    var sum = 0;
    newArray = arr.map(function(i) {
        i = c;
        //sum += w-2*i;
        sum += w;
        c++;
        return sum;
    });
    return newArray[c - 1];
}

function checkStrength(p) {
    var weight;
    var extra;
    switch (true) {
        case p.length < 6:
            return false;
            break;
        case p.length > 18:
            return false;
            break;
        case p.length >= 6 && p.length <= 10:
            weight = 7;
            extra = 4;
            break;
        case p.length > 10 && p.length <= 14:
            weight = 6;
            extra = 3;
            break;
        case p.length > 14 && p.length <= 18:
            weight = 5;
            extra = 2.5;
            break;
    }
    allDigits = p.replace(/\D+/g, '');
    allLower = p.replace(/[^a-z]/g, '');
    allUpper = p.replace(/[^A-Z]/g, '');
    allSpecial = p.replace(/[^\W]/g, '');
    if (allDigits && typeof allDigits !== 'undefined') {
        dgtArray = Array.from(new Set(allDigits.split('')));
        dgtStrength = strengthMap(weight, dgtArray);
    } else {
        dgtStrength = 0;
    }
    if (allLower && typeof allLower !== 'undefined') {
        lowArray = Array.from(new Set(allLower.split('')));
        lowStrength = strengthMap(weight, lowArray);
    } else {
        lowStrength = 0;
    }
    if (allUpper && typeof allUpper !== 'undefined') {
        upArray = Array.from(new Set(allUpper.split('')));
        upStrength = strengthMap(weight, upArray);
    } else {
        upStrength = 0;
    }
    if (allSpecial && typeof allSpecial !== 'undefined') {
        splArray = Array.from(new Set(allSpecial.split('')));
        splStrength = strengthMap(weight, splArray);
    } else {
        splStrength = 0;
    }
    strength = dgtStrength + lowStrength + upStrength + splStrength;
    if (dgtArray.length > 0) {
        strength = strength + extra;
    }
    if (splStrength.length > 0) {
        strength = strength + extra;
    }
    if (p.length >= 6) {
        strength = strength + extra;
    }
    if (lowArray.length > 0 && upArray.length > 0) {
        strength = strength + extra;
    }
    return strength;
}
console.log(strengthResult('5@aKw1'));
console.log(strengthResult('5@aKw13'));
console.log(strengthResult('5@aKw13e'));
console.log(strengthResult('5@aKw13eE'));
console.log(strengthResult('5@aKw13eE!'));
console.log(strengthResult('5@aKw13eE!,'));
console.log(strengthResult('5@aKw13eE!,4'));
console.log(strengthResult('5@aKw13eE!,4D'));
console.log(strengthResult('5@aKw13eE!,4Dq'));
console.log(strengthResult('5@aKw13eE!,4DqJ'));
console.log(strengthResult('5@aKw13eE!,4DqJi'));
console.log(strengthResult('5@aKw13eE!,4DqJi#'));
console.log(strengthResult('5@aKw13eE!,4DqJi#7'));
console.log(strengthResult('5@aKw13eE!,4DqJJ#7'));
console.log(strengthResult('5@aKw33eE!,4DqJJ#7'));

console.log(strengthResult('111111'));
console.log(strengthResult('1111111'));
console.log(strengthResult('11111111'));
console.log(strengthResult('111111111'));
console.log(strengthResult('1111111111'));
console.log(strengthResult('11111111111'));
console.log(strengthResult('111111111111'));
console.log(strengthResult('1111111111111'));
console.log(strengthResult('11111111111111'));
console.log(strengthResult('111111111111111'));
console.log(strengthResult('1111111111111111'));
console.log(strengthResult('11111111111111111'));
console.log(strengthResult('111111111111111111'));

console.log(strengthResult('5@aKw33eE!,4DqJJ#71'));
console.log(strengthResult('11111'));