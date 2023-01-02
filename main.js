const pokemonName = document.querySelector('.pokemonName')
const pokemonId = document.querySelector('.pokemonId')
const pokemonImage = document.querySelector('.pokemonImage')

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (APIresponse.status === 200) {
    const data = await APIresponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'
  pokemonId.innerHTML = ''
  pokemonImage.style.display = 'none'

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonId.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = ''
    searchPokemon = data.id
  } else {
    pokemonName.innerHTML = 'Nout found :C'
    pokemonId.innerHTML = ''
    pokemonImage.style.display = 'none'
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
