const firebaseConfig = {
    databaseURL: "MY_FIREBASE_DATABASE_URL",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const booksRef = database.ref('books');
const membersRef = database.ref('members');

const bookState = JSON.parse(localStorage.getItem('bookState')) || { page: 1, limit: 5, filters: {}, sortBy: 'title' };
const memberState = JSON.parse(localStorage.getItem('memberState')) || { page: 1, limit: 5, filters: {}, sortBy: 'name' };

async function fetchAndDisplayBooks() {
    const snapshot = await booksRef.once('value');
    let books = snapshot.val() ? Object.values(snapshot.val()) : [];
    books = applyFilters(books, bookState.filters);
    books = sortData(books, bookState.sortBy);
    displayData(books, 'books', bookState, bookState => localStorage.setItem('bookState', JSON.stringify(bookState)));
}

async function fetchAndDisplayMembers() {
    const snapshot = await membersRef.once('value');
    let members = snapshot.val() ? Object.values(snapshot.val()) : [];
    members = applyFilters(members, memberState.filters);
    members = sortData(members, memberState.sortBy);
    displayData(members, 'members', memberState, memberState => localStorage.setItem('memberState', JSON.stringify(memberState)));
}

function applyFilters(data, filters) {
    return data.filter(item => {
        for (const key in filters) {
            if (filters[key] && String(item[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
                return false;
            }
        }
        return true;
    });
}

function sortData(data, sortBy) {
    return data.sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])));
}

function displayData(data, tableId, state, saveState) {
    const table = document.getElementById(tableId);
    const pagination = document.getElementById(`${tableId}-pagination`);
    table.innerHTML = `<tr>${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}</tr>`;

    const start = (state.page - 1) * state.limit;
    const end = start + state.limit;
    data.slice(start, end).forEach(item => {
        table.innerHTML += `<tr>${Object.values(item).map(value => `<td>${value}</td>`).join('')}</tr>`;
    });

    pagination.innerHTML = `<button onclick="changePage('${tableId}', ${state.page - 1})">Prev</button>Page ${state.page}<button onclick="changePage('${tableId}', ${state.page + 1})">Next</button>`;
    saveState(state);
}

function changePage(tableId, page) {
    const state = JSON.parse(localStorage.getItem(`${tableId === 'books' ? 'bookState' : 'memberState'}`));
    state.page = Math.max(1, page);
    localStorage.setItem(`${tableId === 'books' ? 'bookState' : 'memberState'}`, JSON.stringify(state));
    if (tableId === 'books') fetchAndDisplayBooks(); else fetchAndDisplayMembers();
}

document.getElementById('book-genre-filter').addEventListener('input', e => { bookState.filters.genre = e.target.value; fetchAndDisplayBooks(); });
document.getElementById('book-author-filter').addEventListener('input', e => { bookState.filters.author = e.target.value; fetchAndDisplayBooks(); });
document.getElementById('book-available-filter').addEventListener('change', e => { bookState.filters.available = e.target.value; fetchAndDisplayBooks(); });
document.getElementById('book-sort-by').addEventListener('change', e => { bookState.sortBy = e.target.value; fetchAndDisplayBooks(); });

document.getElementById('member-name-filter').addEventListener('input', e => { memberState.filters.name = e.target.value; fetchAndDisplayMembers(); });
document.getElementById('member-active-filter').addEventListener('change', e => { memberState.filters.active = e.target.value; fetchAndDisplayMembers(); });
document.getElementById('member-sort-by').addEventListener('change', e => { memberState.sortBy = e.target.value; fetchAndDisplayMembers(); });

fetchAndDisplayBooks();
fetchAndDisplayMembers();
