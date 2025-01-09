import { existsSync } from 'fs';
import { join } from 'path';
import { init } from './init';

describe('init test', () => {
    it('init is ok', () => {
        const config = {
            directory: 'tests/a',
            content: {
                fold: {
                    file: 'file.ts',
                },
                file: 'file2.ts',
            },
        };

        expect(() => {
            init(config);
        }).not.toThrow();
        const p: string = config.content.fold.file;
        expect(existsSync(p.toString())).toEqual(true);
    });

    it('init error', () => {
        const config = {
            directory: 'tests/a',
            content: {
                fold: {
                    file: '_type',
                },
                file: 'file2.ts',
            },
        };

        expect(() => {
            init(config);
        }).toThrow();
    });

    it('content is file is ok', () => {
        const config = { directory: 'tests/aa', content: 'testFile.txt' };
        init(config);
        expect(existsSync(join('tests/aa', 'testFile.txt'))).toEqual(true);
        expect(config.content.toString()).toEqual(
            join('tests/aa', 'testFile.txt'),
        );
    });
});
