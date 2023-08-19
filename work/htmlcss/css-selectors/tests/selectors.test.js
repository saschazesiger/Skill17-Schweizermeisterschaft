/**
 * SwissSkills 2022 - Trade 17 - Web Technologies
 * HTMLCSS - Task 1 - CSS Selectors
 *
 * This file contains the unit tests performed on the CSS Selectors task.
 * You may look at the test cases but not modify them.
 *
 * !!! DO NOT EDIT THIS FILE !!!
 */

/** @type {CSSStyleRule[]} */
let selectors = [];

/** @type {CSSStyleRule[]} */
let originalSelectors = [];

/** @type {HTMLElement} */
let html;

// filter out forbidden selectors
const initSelectors = (s) => {
  selectors = s.map(selector => selector.selectorText);
  originalSelectors = selectors;
  selectors = selectors
    .filter(rule => {
      const forbidden = [
        'nth-child',
        'nth-last-child',
        'nth-of-type',
        'nth-last-of-type',
        'data-target',
      ];

      // check all forbidden selector parts
      if (!rule.startsWith('#task-10') && forbidden.some(f => rule.includes(f))) return false;

      // if selector has comma, make sure its in brackets
      if (rule.includes(',')) {
        return /\([^)]*,[^(]*\)/.test(rule);
      }

      // starts with task ID
      if (!rule.startsWith('#task-')) return false;

      // example task
      if (rule.startsWith('#task-0')) return false;

      return true;
    });
};

// selector getter
const getSelector = taskId => selectors.find(rule => rule.startsWith('#task-' + taskId));
const getOriginalSelector = taskId => originalSelectors.find(rule => rule.startsWith('#task-' + taskId));

describe('CSS Selectors', function () {
  before(async () => {
    try {

      // get HTML
      const htmlData = await fetch('/base/src/task.html')
        .then((response) => response.status === 404 ? fetch('src/task.html') : response)
        .then(response => response.text());
      html = document.createElement('div');
      html.innerHTML = htmlData;

      // get CSS Rules
      const css = await fetch('/base/src/task.css')
        .then((response) => response.status === 404 ? fetch('src/task.css') : response)
        .then(response => response.text());
      const style = document.createElement('style');
      style.innerHTML = css;
      document.body.append(style);

      initSelectors([...document.styleSheets[document.styleSheets.length - 1].cssRules]);

    } catch(err) {
      alert('Please serve this file via http://localhost/ instead of file:///');
      location.href = 'http://localhost/work/htmlcss/css-selectors/tests.html';
    }
  });

  for (let i = 1; i <= 10; i++) {
      it('Task ' + i, () => {
          // has selector
          expect(getSelector(i), `Selector '${getOriginalSelector(i)}' not allowed`).not.to.be.undefined;

          // get correct items
          const correctItems = [
              ...html.querySelectorAll(`#task-${i} [data-target]`),
          ];

          // remove data-target to not be used by selectors
          [
              ...html.querySelectorAll(`#task-${i} [data-target]`),
          ].forEach((item) => item.removeAttribute('data-target'));

          // get competitors items
          const competitorItems = [...html.querySelectorAll(getSelector(i))];

          // check data
          expect(correctItems.length).to.be.gt(0);
          expect(competitorItems.length).to.be.gt(0);
          expect(correctItems).to.eql(competitorItems);
      });
  }
});
