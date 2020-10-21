// generic until i get around to them.

function resolverTest(data) {
  return true;
}

test('Resolvers Check', () => {
  expect(resolverTest(1)).toBe(true);
});
