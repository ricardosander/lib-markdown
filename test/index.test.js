const getFile = require("../index");

describe('getFile::', () => {
    
    it('should be a function', () => {
        expect(typeof getFile).toBe('function');
    });

    it('should return an empty array when given file is empty', async () => {
        const result = await getFile('test/files/empty.md');
        expect(result.length).toBe(0);
    });

    it('should return an empty array when given file has no links', async () => {
        const result = await getFile('test/files/no-links.md');
        expect(result.length).toBe(0);
    });

    it('should return 4 links when given file is file01.md', async () => {
        const result = await getFile('test/files/file01.md');
        expect(result.length).toBe(4);
    });

    it('should return 1 links when given file is file02.md', async () => {
        const result = await getFile('test/files/file02.md');
        expect(result.length).toBe(1);
    });

    it('should return 5 links when directory is given', async () => {
        const result = await getFile('test/files/');
        expect(result.length).toBe(5);
    });
});