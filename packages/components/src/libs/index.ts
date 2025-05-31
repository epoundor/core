export class CoreUIElement {
    constructor(public element: HTMLElement) { }

    setUIAttribute(attribute: string, value: string) {
        this.element.setAttribute(`data-coreui-${attribute}`, value);
    }
    removeUIAttribute(attribute: string) {
        this.element.removeAttribute(`data-coreui-${attribute}`);
    }
    onClick(listener: (this: HTMLElement, ev: MouseEvent) => any) {
        this.element.addEventListener('click', listener);
    }
}
