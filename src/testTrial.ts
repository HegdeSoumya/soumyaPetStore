export class Calculator {
    // tslint:disable-next-line:member-access
    value: number;
    constructor() {
        this.value = 0;
    }
    // tslint:disable-next-line:member-access
    add(n: number): number {
        this.value = n;
        return n;
    }
}
