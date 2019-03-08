import StyleSheet from './StyleSheet';
/**
 * SheetsManager is like a WeakMap which is designed to count StyleSheet
 * instances and attach/detach automatically.
 */
export default class SheetsManager {
    length: number;
    sheets: WeakMap<Object, {
        refs: number;
        sheet: StyleSheet;
    }>;
    readonly size: number;
    get(key: Object): StyleSheet | undefined | null;
    add(key: Object, sheet: StyleSheet): void;
    manage(key: Object): StyleSheet | undefined | null;
    unmanage(key: Object): void;
}
//# sourceMappingURL=SheetsManager.d.ts.map