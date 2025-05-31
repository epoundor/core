import { CoreUIElement } from '../../libs';
export declare class TabElement extends CoreUIElement {
    constructor(element: HTMLElement);
    select(): void;
    reset(): void;
    init(): void;
    setAriaControls(idx: number): void;
}
export declare class TabsElement extends CoreUIElement {
    private _tabs;
    selectedIndex: import('vue').Ref<number, number>;
    defaultIndex?: number;
    constructor(element: HTMLElement, defaultIndex: number, selectedIndex?: number);
    get tabs(): TabElement[];
    init(): void;
    setSelectedTab(currentTabIdx: number): void;
    setSelectedToPreviousTab(): void;
    setSelectedToNextTab(): void;
    onKeydown(event: KeyboardEvent): void;
}
