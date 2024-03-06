import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextMarkupBtn(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevMarkupBtn(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return `
        ${this._generatePrevMarkupBtn(curPage)}
        ${this._generateNextMarkupBtn(curPage)}
      `;
    }

    // Page 1, and there are NO pages
    return '';
  }

  _generatePrevMarkupBtn(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;
  }

  _generateNextMarkupBtn(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotToPage = Number(btn.dataset.goto);
      handler(gotToPage);
    });
  }
}

export default new PaginationView();
