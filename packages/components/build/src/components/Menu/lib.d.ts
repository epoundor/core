import { CoreUIElement } from '../../libs';
export declare class MenuButtonElement extends CoreUIElement {
    constructor(element: HTMLElement);
}
export declare class MenuItemElement extends CoreUIElement {
    active: import('vue').Ref<boolean, boolean>;
    constructor(element: HTMLElement, idx: string);
    select(): void;
    reset(): void;
}
export declare class MenuItemsElement extends CoreUIElement {
    private _isOpen;
    private _items;
    selectedIndex: import('vue').Ref<number, number>;
    constructor(element: HTMLElement);
    open(): void;
    close(): void;
    toogle(): void;
    setActiveItemId(id: number): void;
    init(): void;
    setSelectedItem(idx: number): void;
    setSelectedToPreviousTab(): void;
    setSelectedToNextTab(): void;
    onKeydown(event: KeyboardEvent): void;
}
export declare class MenuElement extends CoreUIElement {
    private _button;
    private _menuItems;
    constructor(element: HTMLElement);
    init(): void;
}
