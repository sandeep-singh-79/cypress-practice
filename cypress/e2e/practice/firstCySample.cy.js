describe ('First Sample CY test', () => {
    it('Validate does not match', () => {
        expect(true).to.not.equal(false);
    });

    it ('Validate it matches', () => {
        expect(true).to.equal(true);
    })
});