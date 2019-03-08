/**
 * Sheets registry to access them all at one place.
 */
export default class SheetsRegistry {
    constructor() {
        this.registry = [];
    }
    /**
     * Current highest index number.
     */
    get index() {
        return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
    /**
     * Register a Style Sheet.
     */
    add(sheet) {
        const { registry } = this;
        const { index } = sheet.options;
        if (registry.indexOf(sheet) !== -1)
            return;
        if (registry.length === 0 || index >= this.index) {
            registry.push(sheet);
            return;
        }
        // Find a position.
        for (let i = 0; i < registry.length; i++) {
            if (registry[i].options.index > index) {
                registry.splice(i, 0, sheet);
                return;
            }
        }
    }
    /**
     * Reset the registry.
     */
    reset() {
        this.registry = [];
    }
    /**
     * Remove a Style Sheet.
     */
    remove(sheet) {
        const index = this.registry.indexOf(sheet);
        this.registry.splice(index, 1);
    }
    /**
     * Convert all attached sheets to a CSS string.
     */
    toString(options) {
        return this.registry
            .filter(sheet => sheet.attached)
            .map(sheet => sheet.toString(options))
            .join('\n');
    }
}
