function resolverTest(data) {
  return true;
}

test('Resolvers Check', () => {
  expect(resolverTest(1)).toBe(true);
});
