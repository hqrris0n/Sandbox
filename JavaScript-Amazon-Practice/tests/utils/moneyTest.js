import { formatCurrency } from "../../scripts/utils/money.js";

// Creating a test suite
describe('test suite: formateCurrency', () => {
  // Creating a test
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds to nearest cent up', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds to nearest cent down', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});