function nonNullable(value) {
    if (value !== null && value !== undefined) {
        return true;
    }
    return false;
}
export class BaseElement {
    constructor(params, ...childs) {
        let { tag } = params;
        if (!tag)
            tag = 'div';
        const element = document.createElement(tag);
        if (params.styles)
            Object.assign(element.style, params.styles);
        if (params.content)
            element.textContent = params.content;
        Object.assign(element, params);
        this.element = element;
        if (params.classes) {
            params.classes.forEach((name) => this.element.classList.add(name));
        }
        if (childs) {
            this.appendChildren(...childs);
        }
    }
    get content() {
        return this.element.textContent || '';
    }
    set content(text) {
        this.element.textContent = text;
    }
    addClass(className) {
        this.element.classList.add(className);
    }
    removeClass(className) {
        this.element.classList.remove(className);
    }
    classList() {
        return this.element.classList;
    }
    containClass(className) {
        if (this.element.classList.contains(className)) {
            return true;
        }
        return false;
    }
    getElement() {
        return this.element;
    }
    append(child) {
        if (child instanceof BaseElement) {
            const elem = child.getElement();
            this.element.append(elem);
        }
        else {
            this.element.append(child);
        }
    }
    prepend(child) {
        if (child instanceof BaseElement) {
            const elem = child.getElement();
            this.element.prepend(elem);
        }
        else {
            this.element.prepend(child);
        }
    }
    appendChildren(...children) {
        children.filter(nonNullable).forEach((elem) => {
            this.append(elem);
        });
    }
    getChildren() {
        const { children } = this.element;
        const childElements = [];
        for (let i = 0; i < children.length; i += 1) {
            if (children[i] instanceof HTMLElement) {
                childElements.push(children[i]);
            }
        }
        return childElements;
    }
    removeChildren() {
        const children = this.getChildren();
        children.forEach((child) => {
            child.remove();
        });
    }
    remove() {
        this.element.remove();
    }
    addListener(event, callback) {
        this.element.addEventListener(event, callback);
    }
    removeListener(event, callback) {
        this.element.removeEventListener(event, callback);
    }
    setAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
    }
    setStyles(styles) {
        Object.assign(this.element.style, styles);
    }
}
