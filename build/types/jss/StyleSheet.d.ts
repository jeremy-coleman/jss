import RuleList from './RuleList';
import { InternalStyleSheetOptions, Rule, ToCssOptions, RuleOptions, StyleSheetOptions, UpdateArguments, JssStyle, Classes, KeyframesMap } from './types';
export default class StyleSheet {
    options: InternalStyleSheetOptions;
    deployed: boolean;
    attached: boolean;
    rules: RuleList;
    renderer: Object;
    classes: Classes;
    keyframes: KeyframesMap;
    queue: Array<Rule> | undefined | null;
    constructor(styles: Object, options: StyleSheetOptions);
    /**
     * Attach renderable to the render tree.
     */
    attach(): this;
    /**
     * Remove renderable from render tree.
     */
    detach(): this;
    /**
     * Add a rule to the current stylesheet.
     * Will insert a rule also after the stylesheet has been rendered first time.
     */
    addRule(name: string, decl: JssStyle, options?: RuleOptions): Rule | null;
    /**
     * Insert rule into the StyleSheet
     */
    insertRule(rule: Rule): void;
    /**
     * Create and add rules.
     * Will render also after Style Sheet was rendered the first time.
     */
    addRules(styles: Object, options?: RuleOptions): Array<Rule>;
    /**
     * Get a rule by name.
     */
    getRule(name: string): Rule;
    /**
     * Delete a rule by name.
     * Returns `true`: if rule has been deleted from the DOM.
     */
    deleteRule(name: string): boolean;
    /**
     * Get index of a rule.
     */
    indexOf(rule: Rule): number;
    /**
     * Deploy pure CSS string to a renderable.
     */
    deploy(): this;
    /**
     * Update the function values with a new data.
     */
    update(...args: UpdateArguments): this;
    /**
     * Convert rules to a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
//# sourceMappingURL=StyleSheet.d.ts.map