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
const errorMessage = document.getElementById("error-message");
const title = document.querySelector("h3");
const confirmPasswordInput = document.getElementById("user-confirm-password-input");
const userForm = document.getElementById("user-form");
function registerSetup(e) {
    title.innerText = "Register";
    const target = e.target;
    if (target.parentNode)
        target.parentNode.innerHTML = `
        If you already have an account, click here to <span onclick="loginSetup(event)">Login</span>
    `;
    const form = confirmPasswordInput.parentNode;
    if (form)
        form.style.display = "flex";
    userForm.action = "user/register";
}
function loginSetup(e) {
    title.innerText = "Login";
    const target = e.target.parentNode;
    if (target)
        target.innerHTML = `
        click here to <span onclick="registerSetup(event)">Register</span> an account
    `;
    const input = confirmPasswordInput.parentNode;
    if (input)
        input.style.display = "none";
    userForm.action = "user/login";
}
function submitForm(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formdata = new FormData(e.target);
        if (formdata.get("password") === formdata.get("confirmPassword") || userForm.action === "http://localhost:5000/user/login") {
            const res = yield fetch(e.target.action, {
                method: e.target.method,
                body: JSON.stringify({
                    email: formdata.get("email"),
                    password: formdata.get("password"),
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.status === 201 || res.status === 200) {
                location.pathname = "main.html";
            }
            const data = yield res.json();
            errorMessage.innerText = data.message;
        }
        else {
            errorMessage.innerText = "Confirm password incorrect";
        }
    });
}
