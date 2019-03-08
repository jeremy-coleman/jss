import { Options as ObservableOptions } from 'jss-plugin-rule-value-observable';
import { Options as DefaultUnitOptions } from 'jss-plugin-default-unit';
declare type Options = {
    defaultUnit?: DefaultUnitOptions;
    observable?: ObservableOptions;
};
declare const _default: (options?: Options) => {
    plugins: (import("../jss").Plugin | {
        onCreateRule(name?: string, decl: Object, options: import("../jss").RuleOptions): import("../jss").Rule;
        onProcessRule(rule: import("../jss").Rule): void;
    } | {
        onCreateRule(name?: string, decl: Object, options: import("../jss").RuleOptions): import("../jss").Rule;
        onProcessStyle(style: Object, rule: import("../jss").Rule): Object;
        onUpdate(data: Object, rule: import("../jss").Rule, sheet: import("../jss").StyleSheet, options: import("../jss").UpdateOptions): void;
    })[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map