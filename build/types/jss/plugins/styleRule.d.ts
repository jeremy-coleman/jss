import { CSSStyleRule, ToCssOptions, RuleOptions, UpdateOptions, Renderer as RendererInterface, JssStyle, JssValue, BaseRule } from '../types';
export declare class BaseStyleRule implements BaseRule {
    type: string;
    key: string;
    isProcessed: boolean;
    style: JssStyle;
    renderer: RendererInterface;
    renderable: Object | undefined | null;
    options: RuleOptions;
    constructor(key: string, style: JssStyle, options: RuleOptions);
    /**
     * Get or set a style property.
     */
    prop(name: string, value?: JssValue, options?: UpdateOptions): this | string;
}
export declare class StyleRule extends BaseStyleRule {
    selectorText: string;
    id: string | undefined | null;
    renderable: CSSStyleRule | undefined | null;
    constructor(key: string, style: JssStyle, options: RuleOptions);
    /**
     * Set selector string.
     * Attention: use this with caution. Most browsers didn't implement
     * selectorText setter, so this may result in rerendering of entire Style Sheet.
     */
    /**
    * Get selector string.
    */
    selector: string;
    /**
     * Apply rule to an element inline.
     */
    applyTo(renderable: HTMLElement): this;
    /**
     * Returns JSON representation of the rule.
     * Fallbacks are not supported.
     * Useful for inline styles.
     */
    toJSON(): Object;
    /**
     * Generates a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
declare const _default: {
    onCreateRule(name: string, style: Object, options: RuleOptions): StyleRule;
};
export default _default;
//# sourceMappingURL=styleRule.d.ts.map