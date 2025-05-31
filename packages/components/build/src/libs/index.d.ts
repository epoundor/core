export declare class CoreUIElement {
    element: HTMLElement;
    constructor(element: HTMLElement);
    setUIAttribute(attribute: string, value: string): void;
    removeUIAttribute(attribute: string): void;
    onClick(listener: (this: HTMLElement, ev: MouseEvent) => any): void;
}
