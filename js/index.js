let planetsData = [];

content = data => {
    tbody.innerHTML = data
        .map(
            planet =>
            `<tr id="sort">
            <td>${planet.name}</td>
            <td>${planet.rotation_period}</td>
            <td>${planet.orbital_period}</td>
            <td>${planet.diameter}</td>
            <td>${planet.terrain}</td>
            <td>${planet.population}</td>
        </tr>`
        )
        .join("");
};

axios
    .get("https://swapi.co/api/planets/")
    .then(res => {
        planetsData.push(...res.data.results);
        content(planetsData);
    })
    .catch(err => {
        console.log(err);
    });

function searchfilter() {
    let input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sort() {
    let table, rows, switching, i, x, y, z;
    table = document.getElementById("myTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            z = false;

            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                z = true;
                break;
            }
        }
        if (z) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

const filterOpt = document.querySelector(".filter");

filterTable = crypto => {
    const data = planetsData.slice(0, +crypto.target.value + 1);
    content(data);
};

filterOpt.addEventListener("change", filterTable);