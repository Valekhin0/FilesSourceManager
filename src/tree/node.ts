import { join } from 'path';
import { SourceManagerError } from '../error';

export class Node {
    public readonly _name: string;
    public readonly _type: NodeType;
    private _parent?: Node;

    public constructor(name: string, type: NodeType, parent?: Node) {
        if (['_name', '_type', '_parent'].indexOf(name) > -1)
            throw new SourceManagerError();

        this._name = name;
        this._type = type;
        this._parent = parent;
    }

    public toString(): string {
        if (this._parent) return join(this._parent.toString(), this._name);
        else return this._name;
    }
}

export enum NodeType {
    file,
    folder,
}
