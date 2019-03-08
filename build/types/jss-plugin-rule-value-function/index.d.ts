import { Rule, RuleOptions, UpdateOptions, StyleSheet } from 'jss';
export default function functionPlugin(): {
    onCreateRule(name?: string, decl: Object, options: RuleOptions): Rule;
    onProcessStyle(style: Object, rule: Rule): Object;
    onUpdate(data: Object, rule: Rule, sheet: StyleSheet, options: UpdateOptions): void;
};
//# sourceMappingURL=index.d.ts.map