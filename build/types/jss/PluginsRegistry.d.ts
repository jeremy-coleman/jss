import StyleSheet from './StyleSheet';
import { Plugin, Rule, RuleOptions, UpdateOptions, JssStyle, JssValue, OnCreateRule, OnProcessRule, OnProcessStyle, OnProcessSheet, OnChangeValue, OnUpdate } from './types';
import { StyleRule } from './plugins/styleRule';
declare type Registry = {
    onCreateRule: Array<OnCreateRule>;
    onProcessRule: Array<OnProcessRule>;
    onProcessStyle: Array<OnProcessStyle>;
    onProcessSheet: Array<OnProcessSheet>;
    onChangeValue: Array<OnChangeValue>;
    onUpdate: Array<OnUpdate>;
};
export default class PluginsRegistry {
    plugins: {
        internal: Array<Plugin>;
        external: Array<Plugin>;
    };
    registry: Registry;
    /**
     * Call `onCreateRule` hooks and return an object if returned by a hook.
     */
    onCreateRule(name: string, decl: JssStyle, options: RuleOptions): Rule | null;
    /**
     * Call `onProcessRule` hooks.
     */
    onProcessRule(rule: Rule): void;
    /**
     * Call `onProcessStyle` hooks.
     */
    onProcessStyle(style: JssStyle, rule: Rule, sheet?: StyleSheet): void;
    /**
     * Call `onProcessSheet` hooks.
     */
    onProcessSheet(sheet: StyleSheet): void;
    /**
     * Call `onUpdate` hooks.
     */
    onUpdate(data: Object, rule: Rule, sheet: StyleSheet, options: UpdateOptions): void;
    /**
     * Call `onChangeValue` hooks.
     */
    onChangeValue(value: JssValue, prop: string, rule: StyleRule): JssValue;
    /**
     * Register a plugin.
     */
    use(newPlugin: Plugin, options?: {
        queue: "internal" | "external";
    }): void;
}
export {};
//# sourceMappingURL=PluginsRegistry.d.ts.map