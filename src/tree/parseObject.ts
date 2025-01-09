import { SourceManagerError } from '../error';
import { Node, NodeType } from './node';

export function parse(obj: object, node: Node) {
    const fields = Object.keys(obj);

    for (let i = 0; i < fields.length; i++) {
        const item = obj[fields[i]];

        if (typeof item === 'string') {
            addField(node, fields[i], new Node(item, NodeType.file, node));
        } else if (typeof item === 'object') {
            addField(
                node,
                fields[i],
                new Node(fields[i], NodeType.folder, node),
            );
            parse(item, node[fields[i]]);
        } else throw new SourceManagerError();
    }
}

export function addField(node: Node, field: string, adding: Node) {
    Object.defineProperty(node, field, {
        value: adding,
        enumerable: true,
    });
}
