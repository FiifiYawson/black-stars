const errorMessage = document.getElementById("error-message") as HTMLParagraphElement
const title = document.querySelector("h3") as HTMLHeadElement
const confirmPasswordInput = document.getElementById("user-confirm-password-input") as HTMLInputElement
const userForm = document.getElementById("user-form") as HTMLFormElement


function registerSetup(e: Event) {
    title.innerText = "Register";

    const target = e.target as HTMLElement

    if(target.parentNode) (target.parentNode as HTMLElement).innerHTML = `
        If you already have an account, click here to <span onclick="loginSetup(event)">Login</span>
    `

    const form = confirmPasswordInput.parentNode as HTMLElement

    if(form) form.style.display = "flex"
    userForm.action = "user/register"
}

function loginSetup(e: Event) {
    title.innerText = "Login"

    const target = ((e.target as HTMLElement).parentNode as HTMLElement)

    if (target) target.innerHTML = `
        click here to <span onclick="registerSetup(event)">Register</span> an account
    `

    const input = confirmPasswordInput.parentNode as HTMLElement

    if(input) input.style.display = "none"
    userForm.action = "user/login"
}

async function submitForm(e: Event) {
    e.preventDefault()

    const formdata: FormData = new FormData((e.target as HTMLFormElement))

    if (formdata.get("password") === formdata.get("confirmPassword") || userForm.action === "http://localhost:5000/user/login") {
        const res: Response = await fetch((e.target as HTMLFormElement).action, {
            method: (e.target as HTMLFormElement).method,
            body: JSON.stringify({
                email: formdata.get("email"),
                password: formdata.get("password"),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.status === 201 || res.status === 200) {
            location.pathname = "main.html"
        }

        const data = await res.json()

        errorMessage.innerText = data.message
    } else {
        errorMessage.innerText = "Confirm password incorrect"
    }
}