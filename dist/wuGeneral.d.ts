export declare class wuGeneral {
    /**
     * selects all the text in a given element
     * @param element
     */
    static selectText(element: HTMLElement): void;
    /**
     * returns the height of an element, taking into account the box-sizing property
     * @param elem any HTMLElement defaults to the body element
     */
    static smartHeight(elem?: HTMLElement): number;
    /**
     * debounces a function - limits the rate at which a function can be called
     * @param func any function
     * @param timeout the minimum time between function calls, all others will be ignored
     * @returns a debounced version of the input function
     */
    static debounce(func: Function, timeout?: number): (...args: any[]) => void;
    /**
     * creates an actual deep copy of an object - removing all references to the old object
     * @param obj
     */
    static deepCopy(obj: any): any;
}
