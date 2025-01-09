import { mkdirSync } from 'fs';
import { SourceManagerError } from './error';
import { Node, NodeType } from './tree/node';
import { parse } from './tree/parseObject';
import { bypassAndCreate } from './source-manage/bypassAndCreate';
import { join } from 'path';

export function init(config: object) {
    try {
        (<any>config).directory = join((<any>config).directory, '');
        const dir: string = (<any>config).directory;
        mkdirSync(dir, { recursive: true });

        if (typeof (<any>config).content === 'object') {
            const node = new Node(dir, NodeType.folder);
            parse((<any>config).content, node);
            bypassAndCreate(node);

            (<any>config).content = node;
        } else if (typeof (<any>config).content === 'string') {
            const node = new Node(
                join(dir, (<any>config).content),
                NodeType.file,
            );
            bypassAndCreate(node);
            (<any>config).content = node;
        } else throw '';
    } catch {
        throw new SourceManagerError();
    }
}
