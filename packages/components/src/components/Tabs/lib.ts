import { CoreUIElement } from "src/libs";
import { ref } from "vue";

// Tab
export class TabElement extends CoreUIElement {
    constructor(element: HTMLElement) {
        super(element);
        this.init();
    }
    select() {
        this.setUIAttribute('tab-selected', 'true');
        this.element.setAttribute('aria-selected', 'true');
        this.element.removeAttribute('tabindex');
        this.element.focus();
    }

    reset() {
        this.removeUIAttribute('tab-selected');
        this.element.setAttribute('aria-selected', 'false');
        this.element.tabIndex = -1;
    }

    init() { }

    setAriaControls(idx: number) {
        this.element.setAttribute('aria-controls', `coreui-tab-${idx}`);
    }
}

export class TabsElement extends CoreUIElement {
    private _tabs: TabElement[] = [];
    public selectedIndex = ref<number>(0);
    public defaultIndex?: number;
    constructor(element: HTMLElement, defaultIndex: number, selectedIndex?: number) {
        super(element);
        this.defaultIndex = defaultIndex;
        this.selectedIndex.value = selectedIndex ?? 0;
        this.init();
    }

    get tabs() {
        return this._tabs;
    }
    init() {
        // Set default index if it exists
        if (typeof this.defaultIndex !== 'undefined' && !this.selectedIndex.value) {
            this.selectedIndex.value = this.defaultIndex;
        }

        // get all tabs
        this._tabs = Array.from(
            this.element.querySelectorAll<HTMLElement>('[data-coreui-tab]')
        ).map((el) => new TabElement(el));
        if (!this._tabs.length) return console.warn("There's no tab");

        // Select default index if it exists or first tab if not
        this.setSelectedTab(this.selectedIndex.value);

        this._tabs.forEach((tab, idx) => {
            tab.setAriaControls(idx);
            tab.element.addEventListener('keydown', this.onKeydown.bind(this));
            tab.onClick(() => {
                this.setSelectedTab(idx);
            });
        });
    }

    setSelectedTab(currentTabIdx: number) {
        if (currentTabIdx < 0) {
            this.setSelectedTab(0);
            return;
        }
        for (var i = 0; i < this._tabs.length; i += 1) {
            const tab = this.tabs[i];
            if (currentTabIdx === i) {
                this.selectedIndex.value = currentTabIdx;
                tab.select();
            } else {
                tab.reset();
            }
        }
    }

    setSelectedToPreviousTab() {
        if (this.selectedIndex.value === 0) {
            this.selectedIndex.value = this._tabs.length - 1;
        } else {
            this.selectedIndex.value--;
        }
        this.setSelectedTab(this.selectedIndex.value);
    }

    setSelectedToNextTab() {
        if (this.selectedIndex.value === this._tabs.length - 1) {
            this.selectedIndex.value = 0;
        } else {
            this.selectedIndex.value++;
        }
        this.setSelectedTab(this.selectedIndex.value);
    }

    /* EVENT HANDLERS */

    onKeydown(event: KeyboardEvent) {
        let flag = false;

        switch (event.key) {
            case 'ArrowLeft':
                this.setSelectedToPreviousTab();
                flag = true;
                break;

            case 'ArrowRight':
                this.setSelectedToNextTab();
                flag = true;
                break;

            case 'Home':
                this.setSelectedTab(0);
                flag = true;
                break;

            case 'End':
                this.setSelectedTab(this._tabs.length - 1);
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
// Tab end
