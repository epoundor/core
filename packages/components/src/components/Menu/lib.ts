import { CoreUIElement } from "src/libs";
import { ref } from "vue";

export class MenuButtonElement extends CoreUIElement {
    constructor(element: HTMLElement) {
        super(element);
        this.element.addEventListener('click', () => this.element.toggleAttribute('aria-expanded'));
    }
}
export class MenuItemElement extends CoreUIElement {
    public active = ref(false);
    constructor(element: HTMLElement, idx: string) {
        super(element);
        this.element.id = idx;
    }

    select() {
        this.active.value = true;
        this.setUIAttribute('item-active', 'true');
    }
    reset() {
        this.active.value = false;
        this.removeUIAttribute('item-active');
    }
}
export class MenuItemsElement extends CoreUIElement {
    private _isOpen: boolean = false;
    private _items: MenuItemElement[] = [];
    public selectedIndex = ref<number>(0);

    constructor(element: HTMLElement) {
        super(element);
        this.close();
        this.init();
    }
    open() {
        this.element.removeAttribute('style');
        this.element.removeAttribute('tabindex');
        this._isOpen = true;
    }
    close() {
        this.element.style.display = 'none';
        this.element.setAttribute('tabindex', '-1');
        this._isOpen = false;
    }
    toogle() {
        if (this._isOpen) this.close();
        else this.open();
    }

    setActiveItemId(id: number) {
        this.element.setAttribute('aria-activedescendant', String(id));
    }

    init() {
        this._items = Array.from(this.element.querySelectorAll<HTMLElement>('[role=menuitem]')).map(
            (el, idx) => new MenuItemElement(el, String(idx))
        );
        // Select MenuElement
        this.element.parentElement?.addEventListener('keydown', this.onKeydown.bind(this));
        this._items.forEach((item, idx) => {
            item.onClick(() => {
                this.setSelectedItem(idx);
                this.close();
            });
        });
    }
    setSelectedItem(idx: number) {
        this.setActiveItemId(idx);
        for (var i = 0; i < this._items.length; i += 1) {
            const item = this._items[i];
            if (idx === i) {
                this.selectedIndex.value = idx;
                item.select();
            } else {
                item.reset();
            }
        }
    }

    setSelectedToPreviousTab() {
        if (this.selectedIndex.value === 0) {
            this.selectedIndex.value = this._items.length - 1;
        } else {
            this.selectedIndex.value--;
        }
        this.setSelectedItem(this.selectedIndex.value);
    }

    setSelectedToNextTab() {
        if (this.selectedIndex.value === this._items.length - 1) {
            this.selectedIndex.value = 0;
        } else {
            this.selectedIndex.value++;
        }
        this.setSelectedItem(this.selectedIndex.value);
    }

    /* EVENT HANDLERS */

    onKeydown(event: KeyboardEvent) {
        let flag = false;
        switch (event.key) {
            case 'ArrowUp':
                this.setSelectedToPreviousTab();
                flag = true;
                break;

            case 'ArrowDown':
                this.setSelectedToNextTab();
                flag = true;
                break;

            case 'Home':
                this.setSelectedItem(0);
                flag = true;
                break;

            case 'End':
                this.setSelectedItem(this._items.length - 1);
                flag = true;
                break;

            case 'Enter':
                this.close();
                flag = true;
                break;

            case 'Esc':
                this.close();
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}
export class MenuElement extends CoreUIElement {
    private _button: MenuButtonElement | null = null;
    private _menuItems: MenuItemsElement | null = null;

    constructor(element: HTMLElement) {
        super(element);

        this.init();
    }

    init() {
        const menuItems = this.element.querySelector<HTMLElement>('[role=menu]');
        if (!menuItems) return console.warn("There's no items");
        this._menuItems = new MenuItemsElement(menuItems);

        const button = this.element.querySelector<HTMLElement>('[data-coreui-button]');
        if (!button) return console.warn("There's no button");
        this._button = new MenuButtonElement(button);

        this._button.element.addEventListener('click', () => {
            this._menuItems!.toogle();
        });

        // close if user click outside
        addEventListener('click', ({ target }) => {
            if (
                !this._menuItems?.element.contains(target as Node) &&
                !this._button?.element.contains(target as Node)
            ) {
                this._menuItems?.close();
            }
        });
    }
}