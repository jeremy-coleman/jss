import { RuleOptions, ToCssOptions, CSSKeyframeRule } from '../types';
import { BaseStyleRule } from './styleRule';
export declare class KeyframeRule extends BaseStyleRule {
    renderable: CSSKeyframeRule | undefined | null;
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(key: string, style: Object, options: RuleOptions): KeyframeRule;
};
export default _default;
//# sourceMappingURL=keyframeRule.d.ts.map