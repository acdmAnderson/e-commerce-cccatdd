import OrderCode from '../../../../src/domain/entities/order-code'

test('Should create a order code', () => {
  const fakeIssueDate = new Date('2021-01-01T10:00:00')
  const fakeSequence = 1
  const orderCode = new OrderCode(fakeIssueDate, fakeSequence)
  expect(orderCode.getCode()).toBe('202100000001')
})
