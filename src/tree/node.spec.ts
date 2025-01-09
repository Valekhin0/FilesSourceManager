import { Node, NodeType } from './node';
import { join } from 'path';

describe('Tree Node', () => {
    const type = NodeType.folder;
    const a = new Node('a', type);
    const b = new Node('b', type, a);
    const c = new Node('c', type, b);
    const d = new Node('d', type, c);

    it('fullPath', () => {
        const path = join('a', 'b', 'c', 'd');
        expect(d + '').toEqual(path);
    });

    it('fullPath of lonely node', () => {
        const path = join('a');
        expect(a + '').toEqual(path);
    });
});
