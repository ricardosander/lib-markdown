const getFile = require("../index");

describe('getFile::', () => {
    
    it('should be a function', () => {
        expect(typeof getFile).toBe('function');
    });

    it('should return an array with results', async () => {
        const result = await getFile('files');
        expect(result.length).toBe(10);
    });
});