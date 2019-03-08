import { Component, Node } from 'react';
import { Jss, GenerateId, SheetsRegistry } from 'jss';
import { Context, Managers } from './types';
declare type Props = {
    jss?: Jss;
    registry?: SheetsRegistry;
    generateId?: GenerateId;
    classNamePrefix?: string;
    disableStylesGeneration?: boolean;
    media?: string;
    children: Node;
};
export default class JssProvider extends Component<Props> {
    static propTypes: {
        registry: any;
        jss: any;
        generateId: any;
        classNamePrefix: any;
        disableStylesGeneration: any;
        children: any;
        media: any;
    };
    managers: Managers;
    createContext: any;
    generateId: GenerateId | undefined | null;
    registry: SheetsRegistry | undefined | null;
    renderProvider: (outerContext: Context) => any;
    render(): boolean;
}
export {};
//# sourceMappingURL=JssProvider.d.ts.map