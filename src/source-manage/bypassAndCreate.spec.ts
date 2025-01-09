import { existsSync } from 'fs';
import { Node, NodeType } from '../tree/node';
import { parse } from '../tree/parseObject';
import { bypassAndCreate } from './bypassAndCreate';
import { join } from 'path';

describe('Tree Node', () => {
    const schema: object = {
        fold1: {
            fold11: {
                test: 'file1.txt',
                test1: 'file2.txt',
            },
            fold12: {
                test: 'file3.txt',
            },
        },
        fold2: {
            fold21: {
                test: 'file4.txt',
                test1: 'file5.txt',
            },
            fold22: {
                test: 'file6.txt',
                fold221: {
                    fold2211: {
                        test: 'file7.txt',
                        test2: 'file8.txt',
                    },
                },
                fold222: {
                    test: 'file9.txt',
                },
                fold223: {
                    test: 'file10.txt',
                    test2: 'file11.txt',
                    test3: 'file12.txt',
                },
                fold224: {},
            },
        },
    };
    const results: string[] = [
        join('fold1', 'fold11', 'file1.txt'),
        join('fold1', 'fold11', 'file2.txt'),
        join('fold1', 'fold12', 'file3.txt'),
        join('fold2', 'fold21', 'file4.txt'),
        join('fold2', 'fold21', 'file5.txt'),
        join('fold2', 'fold22', 'file6.txt'),
        join('fold2', 'fold22', 'fold221', 'fold2211', 'file7.txt'),
        join('fold2', 'fold22', 'fold221', 'fold2211', 'file8.txt'),
        join('fold2', 'fold22', 'fold222', 'file9.txt'),
        join('fold2', 'fold22', 'fold223', 'file10.txt'),
        join('fold2', 'fold22', 'fold223', 'file11.txt'),
        join('fold2', 'fold22', 'fold223', 'file12.txt'),
        join('fold2', 'fold22', 'fold224'),
    ];
    const base = new Node('tests/b', NodeType.folder);

    it('files creation', () => {
        parse(schema, base);
        bypassAndCreate(base);
        results.forEach((p) => {
            expect(existsSync(join(base.toString(), p))).toEqual(true);
        });
    });
});
