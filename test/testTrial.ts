import {expect} from 'chai';
import {Calculator} from '../src/testTrial';

describe('calculator', () => {
    it('should initialize with a calculated value of 0', () => {
        const calculator = new Calculator();
        expect(calculator.value).to.equal(0);
    });
    it('should return a result of 5 when performing addition of 5 immediately after creation,', () => {
        const calculator = new Calculator();
        expect(calculator.add(5)).to.equal(5);
    });
    // tslint:disable-next-line:max-line-length
    it('should store the result of an addition performed immediately after creation as the new calculated value', () => {
        const calculator = new Calculator();
        calculator.add(9);
        expect(calculator.value).to.equal(9);
    });
});
