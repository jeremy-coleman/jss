import RuleList from '../RuleList';
import { CSSKeyframesRule, RuleOptions, ToCssOptions, ContainerRule, Plugin } from '../types';
/**
 * Rule for @keyframes
 */
export declare class KeyframesRule implements ContainerRule {
    type: string;
    at: string;
    key: string;
    name: string;
    id: string;
    rules: RuleList;
    options: RuleOptions;
    isProcessed: boolean;
    renderable: CSSKeyframesRule | undefined | null;
    constructor(key: string, frames: Object, options: RuleOptions);
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const plugin: Plugin;
export default plugin;
//# sourceMappingURL=keyframesRule.d.ts.map