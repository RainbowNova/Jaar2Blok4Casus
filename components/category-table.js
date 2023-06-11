/*Template code from: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/*/

/*TODO: Replace the table title with the category names inside of the Database*/
/*TODO: Replace all data inside each table with the related info inside of the Database.*/

class category_table extends HTMLElement {
    constructor() {
      super();
    }
  
  connectedCallback() {
    this.innerHTML = `
    <div class="row">
    <h1>Category name here</h1>
    </div>
    <table class = table>
        <thead>
            <tr>
                <th>Topic name</th>
                <th># posts</th>
                <th>Latest post</th>
                <th>Posted in</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Topic 1</td>
                <td>X Posts</td>
                <td>Poster + Datetime</td>
                <td>X-board/X-category</td>
            </tr>
            <tr>
                <td>Topic 2</td>
                <td>X Posts</td>
                <td>Poster + Datetime</td>
                <td>X-board/X-category</td>
            </tr>
            <tr>
                <td>Topic 3</td>
                <td>X Posts</td>
                <td>Poster + Datetime</td>
                <td>X-board/X-category</td>
            </tr>
        </tbody>

    </table>
    `;
  }
}

  customElements.define('category-table-component', category_table);