const Inputdob = document.getElementById("dob");
Inputdob.addEventListener("input", () => validate(Inputdob.value));

function validate(dobVal) {
    const today = new Date();
    const dobDate = new Date(dobVal);

    const age = today.getFullYear() - dobDate.getFullYear();

    if (age < 18) {
        Inputdob.setCustomValidity("You must be above 18 years old");
        Inputdob.reportValidity();
    } else {
        Inputdob.setCustomValidity("");
    }
}

let userForm = document.getElementById('user-form');

const retrieveEntries = () => {
    let entries = localStorage.getItem('userEntries');
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const t_cCell = `<td class='border px-4 py-2'>${entry.t_c}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${t_cCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full borde border-collapse border-gray-300"">
        <tr>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Password</th>
            <th class="px-4 py-2 border">Dob</th>
            <th class="px-4 py-2 border">Accepted Terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const t_c = document.getElementById('t&c').checked;

    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        t_c: t_c
    };
    userEntries = retrieveEntries();

    userEntries.push(entry);

    localStorage.setItem('userEntries', JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener('submit', saveUserForm);
displayEntries();
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('userEntries');
});