fetch('./pokedex.json')
    .then((response) => response.json())
    .then((json) => renderGame(json))

function renderGame(json) {
    let pokedex_element = document.getElementById("pokedex")
    for (const pokemon of json) {
        let card_element = createCardForSelection(pokemon)
        pokedex_element.append(card_element)
    }
    let select_buttons_one = document.querySelectorAll(".fighter-one-button")
    select_buttons_one.forEach((item) => {
        item.addEventListener("click", () => {
            if (selected_fighter_two !== item.id) {
                clearSelectedFighters(select_buttons_one)
                item.classList.add("selected")
                selected_fighter_one = item.id
                renderSelectedFighter(json)
            }
        })
    })

    let select_buttons_two = document.querySelectorAll(".fighter-two-button")
    select_buttons_two.forEach((item) => {
        item.addEventListener("click", () => {
            if (selected_fighter_one !== item.id) {
                clearSelectedFighters(select_buttons_two)
                item.classList.add("selected")
                selected_fighter_two = item.id
                renderSelectedFighter(json)
            }
        })
    })

    let fight_button = document.getElementById("fight")
    fight_button.addEventListener("click", () => {
        if (selected_fighter_one && selected_fighter_two) {
            calculateFight(json)
        } else {
            alert("Vyber si dva pokenony")
        }
    })
}

let selected_fighter_one = null;
let selected_fighter_two = null;

function createCardForSelection(card_data) {
    try {
        let card_element = createGenericCard(card_data)
        let select_element = document.createElement("div")
        select_element.classList.add("select-buttons-container")
        let button1 = document.createElement("button")
        button1.innerHTML = "Fighter 1"
        button1.classList.add("fighter-one-button", "fighter-select-button")
        button1.id = card_data.id
        let button2 = document.createElement("button")
        button2.innerHTML = "Fighter 2"
        button2.classList.add("fighter-two-button", "fighter-select-button")
        button2.id = card_data.id
        select_element.append(button1, button2)
        card_element.append(select_element)
        return card_element
    } catch (e) {

    }
}

function createGenericCard(card_data) {
    try {
        let card_element = document.createElement("div")
        card_element.classList.add("pokemon-card")
        let image_container = document.createElement("div")
        image_container.classList.add("pokemon-image-container")
        let image_element = document.createElement("img")
        image_element.src = card_data.image.hires
        image_container.append(image_element)
        let name_element = document.createElement("h1")
        name_element.classList.add("pokemon-name")
        name_element.innerHTML = card_data.name.english
        let description_element = document.createElement("div")
        description_element.classList.add("pokemon-description")
        description_element.innerHTML = card_data.description
        let stats_element = document.createElement("div")
        stats_element.classList.add("pokemon-stats")
        let attack_element = document.createElement("p")
        attack_element.innerHTML = "Attack: " + card_data.base.Attack
        let defense_element = document.createElement("p")
        defense_element.innerHTML = "Defense: " + card_data.base.Defense
        let health_element = document.createElement("p")
        health_element.innerHTML = "HP: " + card_data.base.HP
        let speed_element = document.createElement("p")
        speed_element.innerHTML = "Speed: " + card_data.base.Speed
        stats_element.append(attack_element, defense_element, health_element, speed_element)
        card_element.append(image_container, name_element, stats_element)
        return card_element
    } catch (e) {

    }
}

function createCardForSelectedFighters(card_data, fighter_name) {
    let card_element = createGenericCard(card_data)
    let title = document.createElement("h3")
    title.innerHTML = fighter_name
    card_element.prepend(title)
    return card_element
}

function clearSelectedFighters(nodelist) {
    nodelist.forEach((item) => {
        item.classList.remove("selected")
    })
}

function renderSelectedFighter(pokedex, winner) {
    let card1 = createCardForSelectedFighters(pokedex[selected_fighter_one - 1], "Fighter 1")
    let card2 = createCardForSelectedFighters(pokedex[selected_fighter_two - 1], "Fighter 2")
    let selected_fighters_container = document.getElementById("selected-fighters")
    selected_fighters_container.innerHTML = "";
    if (winner) {
        switch (winner) {
            case 1:
                card1.classList.add("winner")
                break;
            case 2:
                card2.classList.add("winner")
                break;
        }
    }
    selected_fighters_container.append(card1, card2)
}

function calculateFight(pokedex) {
    let stats1 = pokedex[selected_fighter_one - 1].base
    let power1 = stats1.Attack + stats1.Defense + stats1.HP + stats1.Speed
    let stats2 = pokedex[selected_fighter_two - 1].base
    let power2 = stats2.Attack + stats2.Defense + stats2.HP + stats2.Speed
    if (power1 >= power2) {
        renderSelectedFighter(pokedex, 1)
    } else {
        renderSelectedFighter(pokedex, 2)
    }
}