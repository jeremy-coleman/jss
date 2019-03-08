import { Rule, RuleOptions, UpdateOptions } from 'jss';
export declare type Options = UpdateOptions;
export default function observablePlugin(updateOptions?: Options): {
    onCreateRule(name?: string, decl: Object, options: RuleOptions): Rule;
    onProcessRule(rule: Rule): void;
};
//# sourceMappingURL=index.d.ts.map