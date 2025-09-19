let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let postBtn = document.getElementById("postBtn");
let ul = document.getElementById("ul");
let updateName = document.getElementById("updateName");
let updateNumber = document.getElementById("updateNumber");
let updateBtn = document.getElementById("updateBtn");
let cancel = document.getElementById("cancel");
let gender = document.getElementById("gender");
let isMarried = document.getElementById("isMarried");
let updateMarried = document.getElementById("updateMarried")
let updateGender = document.getElementById("updateGender")

cancel.addEventListener("click", () => {
    modal.style.display = "none";
})

let updateId;

let getData = async function () {
    let response = await fetch(
        "https://68bab9bf84055bce63eff647.mockapi.io/api/v1/workers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    let data = await response.json();
    console.log(data);

    return data
};


let postData = async function () {
    let response = await fetch(
        "https://68bab9bf84055bce63eff647.mockapi.io/api/v1/workers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: lastName.value,
            number: firstName.checked,
            gender: gender.checked,
            isMarried: isMarried.checked
        }),
    }
    );

    renderData()
    console.log(response);
};


postBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    postData()
});


function deleteButton(value) {
    fetch(
        `https://68bab9bf84055bce63eff647.mockapi.io/api/v1/workers/${value.id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }); 

    renderData()
}


async function renderData() {

    let data = await getData()
    ul.innerHTML = "";

    data.forEach((item) => {
        let li = document.createElement("li");

        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        editBtn.textContent = "edit";
        deleteBtn.textContent = "delete";

        li.innerHTML = `
        <img width="50" src=${item.avatar} alt="">
        <span>${item.name}</span>
        <div>
        <span>IsMarried</span>
        <input type="checkbox" ${item.isMarried ? "checked" : ""}>
        </div>
        <div>
        <span>Gender</span>
        <input type="checkbox" ${item.gender ? "checked" : ""}>
        </div>

        <div>
         ${item.number}
        </div>
    `

        li.appendChild(editBtn);

        editBtn.addEventListener("click", () => {
            modal.style.display = "flex";

            updateId = item.id;
        });


        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            deleteButton(item)
        });

        ul.appendChild(li);
    })
}


renderData()


updateBtn.addEventListener("click", async () => {
    await fetch(
        `https://68bab9bf84055bce63eff647.mockapi.io/api/v1/workers/${updateId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updateName.value,
                number: updateNumber.value,
                gender: updateGender.checked,
                isMarried: updateMarried.checked
            }),
        }
    ).then((response) => {
        console.log(response);

        if (response.ok === true) {
            modal.style.display = "none";
            updateName.value = "";
            updateNumber.value = "";
        }

    });

    renderData();
});