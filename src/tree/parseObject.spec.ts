import { Node, NodeType } from './node';
import { addField, parse } from './parseObject';
import { join } from 'path';

describe('Object to tree parsing', () => {
    const type = NodeType.folder;

    it('addField', () => {
        const node: any = new Node('x', type);
        addField(node, 'n', new Node('field', type, node));
        expect(Object.keys(node)).toContain('n');
        expect(node.n._name).toEqual('field');
        expect(node.n.toString()).toEqual(join('x', 'field'));
        expect(node.n + '').toEqual(join('x', 'field'));
    });

    const testObject: object = {
        a: {
            a: 'a.js',
            b: {
                a: 'a',
            },
            c: 'c',
        },
        b: 'b',
        c: 'c',
    };
    it('parsing success', () => {
        const node: any = new Node('', type);
        parse(testObject, node);
        const r1 = join('a', 'a.js');
        expect(node.a.a + '').toEqual(r1);
        const r2 = join('a', 'b', 'a');
        expect(node.a.b.a + '').toEqual(r2);
        expect(node.a.a + '').toEqual(join('a', 'a.js'));
    });

    const testObject2: object = {
        a: 'a',
        b: 4,
        c: 'c',
    };
    it('parsing success', () => {
        const node: any = new Node('', type);
        expect(() => {
            parse(testObject2, node);
        }).toThrow();
    });
});
