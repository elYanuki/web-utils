export class wuGeneral {
    static selectText(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    static smartHeight(elem = document.querySelector("body")) {
        let styles = getComputedStyle(elem);
        if (styles.boxSizing == "border-box") {
            return elem.clientHeight;
        }
        else {
            return elem.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
        }
    }
    static debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
}
//# sourceMappingURL=wuGeneral.js.map