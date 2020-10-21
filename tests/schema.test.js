// generic until i get around to them.

function schemaTest(data){
    return true;
}

test('Schema Check', () => {
    expect(schemaTest(1)).toBe(true);
});