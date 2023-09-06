export class FavoritesData {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [
            {
                login: "Michelle-Laignier",
                name: "Michelle Laignier",
                public_repos: 28,
                followers: 4
            },
            {
                login: "diego3g",
                name: "Diego Fernandes",
                public_repos: 280,
                followers: 4000
            }
        ]
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        this.entries = filteredEntries
        this.update()
    }
}

export class FavoritesHtml extends FavoritesData {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector("tbody")

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector(".user img")
            row.querySelector(".user a")
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