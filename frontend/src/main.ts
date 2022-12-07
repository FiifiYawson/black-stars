const table = document.querySelector("#players-table tbody") as HTMLTableElement
const form = document.getElementById("player-form") as HTMLFormElement
const playerAge = document.getElementById("player-age-input") as HTMLInputElement
const playerName = document.getElementById("player-name-input") as HTMLInputElement
const playerRating = document.getElementById("player-rating-input") as HTMLInputElement
const playerHeight = document.getElementById("player-height-input") as HTMLInputElement
const playerWeight = document.getElementById("player-weight-input") as HTMLInputElement
const playerSubmit = document.getElementById("player-submit") as HTMLInputElement
const checkboxs = document.querySelectorAll("input[type=checkbox]") as NodeList
let updateTr: HTMLTableRowElement;

type Player = {
    name: string,
    age: Number | undefined | null,
    positions: string[] | undefined | null,
    height: Number | undefined | null,
    rating: Number | undefined | null,
    weight: Number | undefined | null,
    _id: string,
}

let players: Player[]


async function getAllPlayers() {
    const res: Response = await fetch("players")
    const data = await res.json()

    if (data.isSuccess) {
        players = data.allPlayers
        data.allPlayers.forEach((player: Player) => {
            const tr = document.createElement("tr") as HTMLTableRowElement

            tr.innerHTML = `
                <td>${player.name || ""}</td>
                <td>${player.age || ""}</td>
                <td>${player.positions?.join(", ") || ""}</td>
                <td>${player.rating || ""}</td>
                <td>${player.height || ""}</td>
                <td>${player.weight || ""}</td>
                <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${player._id}')">+</button></td>
                <td><button class="delete-player-button" onclick="deletePlayer(event, '${player._id}')">X</button></td>
            `

            table.appendChild(tr)
        })
    } else {
        document.body.innerHTML = `
            <h1> Unauthorizied access </h1>
            <a href="/index.html"> Sign in first </a>
        `
    }
}

function addPlayerSetup() {
    form.action = `/players`
    form.method = `POST`

    playerName.value = ""
    playerAge.value = ""
    playerRating.value = ""
    playerHeight.value = ""
    playerWeight.value = ""
    playerSubmit.value = "Submit"

    checkboxs.forEach((check) => {
        (check as HTMLInputElement).checked = false
    })

    form.classList.toggle("active")

    form.scrollIntoView()
}

function updatePlayerSetup(e: Event, id: String) {
    updateTr = ((e.target as HTMLElement)?.parentNode as HTMLElement).parentNode as HTMLTableRowElement

    const player: Player | undefined = players.find((obj: Player) => obj._id === id)

    form.action = `/players/${player?._id}`
    form.setAttribute("method", "PUT")

    playerName.value = player?.name || ""
    playerAge.value = player?.age?.toString()  || ""
    playerRating.value = player?.rating?.toString() || ""
    playerHeight.value = player?.height?.toString() || ""
    playerWeight.value = player?.weight?.toString() || ""
    playerSubmit.value = "Save Changes"

    checkboxs.forEach((check) => {
        if (player?.positions?.includes((check as HTMLInputElement).value)) {
            (check as HTMLInputElement).checked = true
        } else {
            (check as HTMLInputElement).checked = false
        }
    })

    form.classList.add("active")

    form.scrollIntoView()
}

async function deletePlayer(e: Event, id: string) {
    const res: Response = await fetch(`/players/${id}`, {
        method: "DELETE",
    })

    const data = await res.json()

    if (data.isSuccess) {
        ((e.target as HTMLElement)?.parentNode?.parentNode as HTMLElement).remove();
    }
}

function createPlayer(player: Player) {
    const tr: HTMLTableRowElement = document.createElement("tr")

    tr.innerHTML = `
        <td>${player.name || ""}</td>
        <td>${player.age || ""}</td>
        <td>${player.positions?.join(", ") || ""}</td>
        <td>${player.rating || ""}</td>
        <td>${player.height || ""}</td>
        <td>${player.weight || ""}</td>
        <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${player._id}')">+</button></td>
        <td><button class="delete-player-button" onclick="deletePlayer(event, '${player._id}')">x</button></td>
    `

    table.appendChild(tr)

    players.push(player)
}

function updatePlayer(id: string) {
    const checks: string[] = []

    checkboxs.forEach((check) => {
        if ((check as HTMLInputElement).checked) {
            checks.push((check as HTMLInputElement).value)
        }
    })

    players[players.indexOf(players.find((obj: Player) => obj._id === id) as Player)] = {
        _id: id,
        name: playerName.value,
        age: new Number(playerAge.value),
        positions: checks,
        rating: new Number(playerRating.value),
        height: new Number(playerHeight.value),
        weight: new Number(playerWeight.value),
    }

    updateTr.innerHTML = `
        <td>${playerName.value || ""}</td>
        <td>${playerAge.value || ""}</td>
        <td>${checks.join(", ") || ""}</td>
        <td>${playerRating.value || ""}</td>
        <td>${playerHeight.value || ""}</td>
        <td>${playerWeight.value || ""}</td>
        <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${id}')">+</button></td>
        <td><button class="delete-player-button" onclick="deletePlayer(event, '${id}')">x</button></td>
    `
}

async function submitPlayer(e: Event) {
    e.preventDefault()

    const currentForm: FormData = new FormData(e.target as HTMLFormElement)

    const formData = {
        name: currentForm.get("name"),
        age: currentForm.get("age"),
        height: currentForm.get("height"),
        weight: currentForm.get("weight"),
        rating: currentForm.get("rating"),
        positions: currentForm.getAll("positions")
    }

    let method: string = "post";

    if ((e.target as HTMLFormElement).method === "get") method = "put"

    const res: Response = await fetch((e.target as HTMLFormElement).action, {
        method: method,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await res.json()

    const player: Player = data.player

    if (res.status === 201) {
        createPlayer(player)
    } else if (res.status === 200) {
        updatePlayer(player._id)
    }

    form.classList.remove("active")
}

async function deleteAccount() {
    const res: Response = await fetch("/user", {method: "DELETE"})

    const data: Object = await res.json()

    console.log(res, data)
    if (res.status === 200) {
        location.href = "index.html"
    }
}

async function logout() {
    const res: Response = await fetch("/user/logout")

    const data: Object = await res.json()

    if (res.status === 200) {
        location.href = "index.html"
    }
}

getAllPlayers()