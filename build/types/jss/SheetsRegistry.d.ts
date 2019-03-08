import { ToCssOptions } from './types';
import StyleSheet from './StyleSheet';
/**
 * Sheets registry to access them all at one place.
 */
export default class SheetsRegistry {
    registry: Array<StyleSheet>;
    /**
     * Current highest index number.
     */
    readonly index: number;
    /**
     * Register a Style Sheet.
     */
    add(sheet: StyleSheet): void;
    /**
     * Reset the registry.
     */
    reset(): void;
    /**
     * Remove a Style Sheet.
     */
    remove(sheet: StyleSheet): void;
    /**
     * Convert all attached sheets to a CSS string.
     */
    toString(options?: ToCssOptions): string;
}
//# sourceMappingURL=SheetsRegistry.d.ts.map