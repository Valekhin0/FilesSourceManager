import { Node, NodeType } from '../tree/node';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function bypassAndCreate(tree: Node) {
    const overDir = join(tree.toString(), '..');
    if (!existsSync(overDir)) mkdirSync(overDir, { recursive: true });

    const currentDirObj: ICurrentDir = {
        currentDir: '',
    };
    _bypassAndCreate(currentDirObj, tree);
}

interface ICurrentDir {
    currentDir: string;
}

function _bypassAndCreate(currentDirObj: ICurrentDir, tree: Node) {
    currentDirObj.currentDir = join(currentDirObj.currentDir, tree._name);

    createOrSkip(currentDirObj.currentDir, tree._type);
    removeServiceVariables(Object.keys(tree)).forEach((child) => {
        _bypassAndCreate(currentDirObj, tree[child]);
    });
    currentDirObj.currentDir = join(currentDirObj.currentDir, '..');
}

function createOrSkip(path: string, type: NodeType) {
    if (!existsSync(path)) {
        if (type === NodeType.folder) mkdirSync(path);
        else writeFileSync(path, '');
    }
}

function removeServiceVariables(array: string[]): string[] {
    ['_name', '_parent', '_type'].forEach((val) => {
        const index = array.indexOf(val);
        if (index > -1) array.splice(index, 1);
    });
    return array;
}
