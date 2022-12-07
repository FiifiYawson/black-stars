"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const table = document.querySelector("#players-table tbody");
const form = document.getElementById("player-form");
const playerAge = document.getElementById("player-age-input");
const playerName = document.getElementById("player-name-input");
const playerRating = document.getElementById("player-rating-input");
const playerHeight = document.getElementById("player-height-input");
const playerWeight = document.getElementById("player-weight-input");
const playerSubmit = document.getElementById("player-submit");
const checkboxs = document.querySelectorAll("input[type=checkbox]");
let updateTr;
let players;
function getAllPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("players");
        const data = yield res.json();
        if (data.isSuccess) {
            players = data.allPlayers;
            data.allPlayers.forEach((player) => {
                var _a;
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${player.name || ""}</td>
                <td>${player.age || ""}</td>
                <td>${((_a = player.positions) === null || _a === void 0 ? void 0 : _a.join(", ")) || ""}</td>
                <td>${player.rating || ""}</td>
                <td>${player.height || ""}</td>
                <td>${player.weight || ""}</td>
                <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${player._id}')">+</button></td>
                <td><button class="delete-player-button" onclick="deletePlayer(event, '${player._id}')">X</button></td>
            `;
                table.appendChild(tr);
            });
        }
        else {
            document.body.innerHTML = `
            <h1> Unauthorizied access </h1>
            <a href="/index.html"> Sign in first </a>
        `;
        }
    });
}
function addPlayerSetup() {
    form.action = `/players`;
    form.method = `POST`;
    playerName.value = "";
    playerAge.value = "";
    playerRating.value = "";
    playerHeight.value = "";
    playerWeight.value = "";
    playerSubmit.value = "Submit";
    checkboxs.forEach((check) => {
        check.checked = false;
    });
    form.classList.toggle("active");
    form.scrollIntoView();
}
function updatePlayerSetup(e, id) {
    var _a, _b, _c, _d, _e;
    updateTr = ((_a = e.target) === null || _a === void 0 ? void 0 : _a.parentNode).parentNode;
    const player = players.find((obj) => obj._id === id);
    form.action = `/players/${player === null || player === void 0 ? void 0 : player._id}`;
    form.setAttribute("method", "PUT");
    playerName.value = (player === null || player === void 0 ? void 0 : player.name) || "";
    playerAge.value = ((_b = player === null || player === void 0 ? void 0 : player.age) === null || _b === void 0 ? void 0 : _b.toString()) || "";
    playerRating.value = ((_c = player === null || player === void 0 ? void 0 : player.rating) === null || _c === void 0 ? void 0 : _c.toString()) || "";
    playerHeight.value = ((_d = player === null || player === void 0 ? void 0 : player.height) === null || _d === void 0 ? void 0 : _d.toString()) || "";
    playerWeight.value = ((_e = player === null || player === void 0 ? void 0 : player.weight) === null || _e === void 0 ? void 0 : _e.toString()) || "";
    playerSubmit.value = "Save Changes";
    checkboxs.forEach((check) => {
        var _a;
        if ((_a = player === null || player === void 0 ? void 0 : player.positions) === null || _a === void 0 ? void 0 : _a.includes(check.value)) {
            check.checked = true;
        }
        else {
            check.checked = false;
        }
    });
    form.classList.add("active");
    form.scrollIntoView();
}
function deletePlayer(e, id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`/players/${id}`, {
            method: "DELETE",
        });
        const data = yield res.json();
        if (data.isSuccess) {
            ((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode).remove();
        }
    });
}
function createPlayer(player) {
    var _a;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${player.name || ""}</td>
        <td>${player.age || ""}</td>
        <td>${((_a = player.positions) === null || _a === void 0 ? void 0 : _a.join(", ")) || ""}</td>
        <td>${player.rating || ""}</td>
        <td>${player.height || ""}</td>
        <td>${player.weight || ""}</td>
        <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${player._id}')">+</button></td>
        <td><button class="delete-player-button" onclick="deletePlayer(event, '${player._id}')">x</button></td>
    `;
    table.appendChild(tr);
    players.push(player);
}
function updatePlayer(id) {
    const checks = [];
    checkboxs.forEach((check) => {
        if (check.checked) {
            checks.push(check.value);
        }
    });
    players[players.indexOf(players.find((obj) => obj._id === id))] = {
        _id: id,
        name: playerName.value,
        age: new Number(playerAge.value),
        positions: checks,
        rating: new Number(playerRating.value),
        height: new Number(playerHeight.value),
        weight: new Number(playerWeight.value),
    };
    updateTr.innerHTML = `
        <td>${playerName.value || ""}</td>
        <td>${playerAge.value || ""}</td>
        <td>${checks.join(", ") || ""}</td>
        <td>${playerRating.value || ""}</td>
        <td>${playerHeight.value || ""}</td>
        <td>${playerWeight.value || ""}</td>
        <td><button class="update-player-button" onclick="updatePlayerSetup(event, '${id}')">+</button></td>
        <td><button class="delete-player-button" onclick="deletePlayer(event, '${id}')">x</button></td>
    `;
}
function submitPlayer(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const currentForm = new FormData(e.target);
        const formData = {
            name: currentForm.get("name"),
            age: currentForm.get("age"),
            height: currentForm.get("height"),
            weight: currentForm.get("weight"),
            rating: currentForm.get("rating"),
            positions: currentForm.getAll("positions")
        };
        let method = "post";
        if (e.target.method === "get")
            method = "put";
        const res = yield fetch(e.target.action, {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = yield res.json();
        const player = data.player;
        if (res.status === 201) {
            createPlayer(player);
        }
        else if (res.status === 200) {
            updatePlayer(player._id);
        }
        form.classList.remove("active");
    });
}
function deleteAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("/user", { method: "DELETE" });
        const data = yield res.json();
        console.log(res, data);
        if (res.status === 200) {
            location.href = "index.html";
        }
    });
}
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("/user/logout");
        const data = yield res.json();
        if (res.status === 200) {
            location.href = "index.html";
        }
    });
}
getAllPlayers();
