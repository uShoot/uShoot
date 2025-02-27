const DEPLOY_URL = 'https://script.google.com/macros/s/AKfycbwgq0Ltff_Dn3mk-MwluWZWukobIUe24eX0_OstwNZWY8GtyNGbmzwjeeyTu43Xr7s/exec';
const userEmail = localStorage.getItem('u_local');

if (!userEmail) {
    window.location.href = 'login.html';
}

async function loadUserCoins() {
    document.getElementById('loader').style.display = 'flex';
    try {
        const response = await fetch(DEPLOY_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'getUserCoins', email: userEmail })
        });

        const data = await response.json();
        if (data.status === 'success') {
            displayCoins(data.coins);
        }
    } catch (error) {
        console.log('Error loading coins');
    }
    fetchItems();
}

function displayCoins(coins) {
    const container = document.getElementById('coinsContainer');
    container.innerHTML = coins === null ? '<p>No coins found</p>' : `<p>Balance: <b>${coins}</b></p>`;
}

async function fetchItems() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbytqBJ-R-tViJoebMotirbWrWx7Gh4U9wT8do_wD5zO9YQpuFf5KKFrER7n54nYGAfR/exec', { method: 'POST' });
        const data = await response.json();

        if (data && data.items) {
            const container = document.getElementById('items-container');
            data.items.forEach((item) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `<h3>${item.title}</h3><img src="${item.image}" alt="${item.title}" width="200">`;
                itemElement.addEventListener('click', () => saveItemTypeAndRedirect(item));
                container.appendChild(itemElement);
            });
        }
    } catch (error) {
        console.log('Error fetching items');
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

function saveItemTypeAndRedirect(item) {
    localStorage.setItem('itemType', item.type);
    window.location.href = 'items.html';
}

loadUserCoins();

function reload() {
    location.reload();
}