import { GitHubUser } from "./GitHubUser.js"

export class FavoritesData {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
        this.add()
    }

    async add(username) {
        try {
            const userAlreadyExists = this.entries.find(entry => entry.login === username)

            if(username == undefined) {
                return
            }

            if(userAlreadyExists) {
                throw new Error("Usuário já cadastrado")
            }

            const user = await GitHubUser.search(username)
            console.log(user);

            if(user.login == undefined) {
                throw new Error("Usuário não encontrado")
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()
            
        } catch(error) {
            alert(error.message);
        }
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem("users")) || []
    }

    save() {
        localStorage.setItem("users", JSON.stringify(this.entries))
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        this.entries = filteredEntries
        this.update()
        this.save()
    }

    emptyTableVerify() {
        const empty = document.querySelector(".empty")
        const tbody = document.querySelector("tbody")
        if(this.entries.length <= 0) {
            empty.classList.remove("hide")
            tbody.append(empty)
        } else {
            empty.classList.add("hide")
        }
        
    }
}

export class FavoritesHtml extends FavoritesData {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector("tbody")

        this.update()
        this.htmlAdd()
    }

    update() {
        this.emptyTableVerify()
        
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector(".user img").src = `https://github.com/${user.login}.png`
            row.querySelector(".user img").alt = `Foto de perfil de ${user.name}`

            row.querySelector(".user a").href = `https://github.com/${user.login}`
            row.querySelector(".user p").textContent = user.name
            row.querySelector(".user span").textContent = user.login
            row.querySelector(".repositories").textContent = user.public_repos
            row.querySelector(".followers").textContent = user.followers

            row.querySelector(".remove").addEventListener("click", () => {
                const isOk = confirm("Tem certeza que deseja remover esse usuário?")
                if(isOk) {
                    this.delete(user)
                }
            })
            this.tbody.append(row)
        })
    }

    htmlAdd() {
        const favButton = this.root.querySelector("#search button")
        favButton.addEventListener("click", () => {
            const { value } = this.root.querySelector("#input-search")
            this.add(value)
        })

    }

    createRow() {
        const row = document.createElement("tr")

        row.innerHTML = `
        <td class="user">
            <img src="https://github.com/Michelle-Laignier.png" alt="Imagem de perfil de Michelle">
            <a href="https://github.com/Michelle-Laignier" target="_blank">
                <p></p>
                <span></span>
            </a>
        </td>
        <td class="repositories"></td>
        <td class="followers"></td>
        <td>
            <button class="remove">Remover</button>
        </td>`

        return row
    }

    removeAllTr() { // pro delete funcionar      
        this.tbody.querySelectorAll("tr").forEach(tr => {
            tr.remove()
        });
    }
}