import { RuleListOptions, ToCssOptions, Rule, RuleOptions, JssStyle, Classes, KeyframesMap, UpdateArguments } from './types';
/**
 * Contains rules objects and allows adding/removing etc.
 * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
 */
export default class RuleList {
    map: {
        [key: string]: Rule;
    };
    raw: {
        [key: string]: JssStyle;
    };
    index: Array<Rule>;
    options: RuleListOptions;
    classes: Classes;
    keyframes: KeyframesMap;
    constructor(options: RuleListOptions);
    /**
     * Create and register rule.
     *
     * Will not render after Style Sheet was rendered the first time.
     */
    add(key: string, decl: JssStyle, ruleOptions?: RuleOptions): Rule | null;
    /**
     * Get a rule.
     */
    get(name: string): Rule;
    /**
     * Delete a rule.
     */
    remove(rule: Rule): void;
    /**
     * Get index of a rule.
     */
    indexOf(rule: Rule): number;
    /**
     * Run `onProcessRule()` plugins on every rule.
     */
    process(): void;
    /**
     * Register a rule in `.map` and `.classes` maps.
     */
    register(rule: Rule): void;
    /**
     * Unregister a rule.
     */
    unregister(rule: Rule): void;
    /**
     * Update the function values with a new data.
     */
    update(...args: UpdateArguments): void;
    /**
     * Execute plugins, update rule props.
     */
    onUpdate(data: Object, rule: Rule, options?: Object): void;
    /**
     * Convert rules to a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
//# sourceMappingURL=RuleList.d.ts.map