import { BaseElement } from './script.js';
const someContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
// создаем параграф напрямую из BaseElement
// <p class="example parent__example">someContent</p>
const p = new BaseElement({
    tag: 'p',
    content: someContent,
    classes: ['parent__example', 'example'],
});
// используем "p.element" потому что просто "p" не является DOM-узлом, функция append не знает тип BaseElement
document.body.append(p.element);
/********************************/
class Button extends BaseElement {
    constructor(text, className, callback) {
        super({ tag: 'div', content: text, classes: className });
        this.addListener('click', callback);
        // "div" можно не указывать, потому что класс создан так, чтобы при остутсвии тега использовался тег div по умолчанию
        // ну и кроме "div" можно использовать любой тег для создания кнопки, который нам нужен
    }
}
// создаём разные кнопки используя наш подкласс
const button1 = new Button('Press me!', ['button'], () => {
    alert('Hello!');
});
const button2 = new Button('Press me too!', ['button'], () => {
    alert('Bye!');
});
// такое применение стилей это просто пример, такая функция может пригождаться в других случаях)
p.setStyles({
    padding: '1rem',
    backgroundColor: 'wheat',
    border: 'solid 1px black',
    borderRadius: '5px',
});
const buttonStyles = {
    margin: '1rem',
    cursor: 'pointer',
    width: 'fit-content',
    backgroundColor: 'red',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '5px',
    borderBottom: 'solid 3px brown',
};
button1.setStyles(buttonStyles);
button2.setStyles(buttonStyles);
// внутрь BaseElement'ов можем вставлять как другие BaseElement'ы так и обычные HTMLElement'ы
p.append(button1);
document.body.append(button2.element);
/*********************/
// пример использования типа ParamsOmitTag, здесь мы создаем функцию для создания определенного элемента
function createSection(params) {
    return new BaseElement(Object.assign({ tag: 'section' }, params));
}
const section = createSection({ classes: ['main-section'] });
/**********************/
// при создании элементов, мы можем вкладывать внутрь дочерние элементы, и в эти дочерние тоже можно вкладывать другие
const parent = new BaseElement({ classes: ['parent'] }, new BaseElement({ classes: ['child-1'] }), new BaseElement({ classes: ['child-2'] }, new BaseElement({ classes: ['child-child'] })), new BaseElement({ classes: ['child-3'] }));
