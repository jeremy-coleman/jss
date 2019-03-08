import StyleSheet from './StyleSheet';
import PluginsRegistry from './PluginsRegistry';
import { Rule, RuleFactoryOptions, StyleSheetFactoryOptions, Plugin, JssOptions, InternalJssOptions, JssStyle, GenerateId } from './types';
export default class Jss {
    id: number;
    version: string;
    plugins: PluginsRegistry;
    options: InternalJssOptions;
    generateId: GenerateId;
    constructor(options?: JssOptions);
    /**
     * Prepares various options, applies plugins.
     * Should not be used twice on the same instance, because there is no plugins
     * deduplication logic.
     */
    setup(options?: JssOptions): this;
    /**
     * Create a Style Sheet.
     */
    createStyleSheet(styles: Object, options?: StyleSheetFactoryOptions): StyleSheet;
    /**
     * Detach the Style Sheet and remove it from the registry.
     */
    removeStyleSheet(sheet: StyleSheet): this;
    /**
     * Create a rule without a Style Sheet.
     */
    createRule(name?: string, style?: JssStyle, options?: RuleFactoryOptions): Rule | null;
    /**
     * Register plugin. Passed function will be invoked with a rule instance.
     */
    use(...plugins: Array<Plugin>): this;
}
//# sourceMappingURL=Jss.d.ts.map