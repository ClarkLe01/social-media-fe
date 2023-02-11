import sumOfTwoNumber from './sumOfTwoNumber';

test('should add two numbers', () => {
    const sum = sumOfTwoNumber(3, 4);
    expect(sum).toBe(7);
});
