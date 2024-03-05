module.exports = function remainder (arr) {
    let number_without_remainder = 0;
    for (let item of arr) {
        (item % 3 === 0) && (number_without_remainder++)
    }
    return number_without_remainder;
}