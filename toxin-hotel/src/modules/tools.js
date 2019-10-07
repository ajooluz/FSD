export const conjugation = (n, words) => {
    if (!Number.isInteger(n)) {
        throw new Error('n is not a number');
    }
    if (!(words instanceof Array)) {
        throw new Error('words is not an array');
    }
    if (words.length !== 3) {
        throw new Error('words.length !== 3');
    }

    // хитрый выбор правильного слова из массива
    let index = 0;
    if (n % 10 === 1 && n % 100 !== 11) {
        index = 0;
    } else {
        if ((n % 10 >= 2) && (n % 10 <= 4) && ((n % 100 < 10) || (n % 100 >= 20))) {
            index = 1;
        } else {
            index = 2;
        }
    }
    return words[index];
};