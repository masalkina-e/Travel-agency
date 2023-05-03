import { format, differenceInDays  } from 'date-fns'

let uniqCountry = []
let favoriteTours = []
let isFavoritePage = false
let currentTourId

async function loadTours() {
    const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours')
    const data = await response.json()
    return data
}

function renderDropdown() {
    const selectCountry = document.getElementById('select-country')
    selectCountry.innerHTML = `
    <option value="0">Все туры</option>
    `
    uniqCountry.forEach((country) => {
        selectCountry.innerHTML +=`
        <option value="${country}">${country}</option>
        `
    })
}

function renderUniqCountry(tours) {
    tours.forEach((tour) => {
       if (uniqCountry.includes(tour.country)) {
          return
       }
       uniqCountry.push(tour.country)
    //    console.log(uniqCountry)
    })   
}

function renderTours(tours) {
    const boxTours = document.getElementById('box-tours')
    const boxError = document.getElementById('box-error')
    boxTours.innerHTML = ""
    boxError.innerHTML = ""

    if (tours.length === 0) {
        boxError.innerHTML = `
        <p class="py-52 text-center text-sm text-slate-500">К сожалению, по заданным условиям ничего не найдено. Попробуйте изменить критерии поиска.</p>
        `
        return
    }

    tours.forEach((tour) => {

        const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))

        const currentFormatPrice = tour.price
        const formatedPrice = currentFormatPrice.toLocaleString('ru-RU')+'.00'

        let location = `<span class="text-sm text-slate-600 font-normal text-justify">${tour.city}, ${tour.country}</span>`

        if (tour.city == null ) {
            location = `<span class="text-sm text-slate-600 font-normal text-justify">${tour.country}</span>`
        }

        let iconEmptyHeart =`<svg xmlns=http://www.w3.org/2000/svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4 text-slate-500" id="empty-heart-${tour.id}"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`
        let iconFullHeart =`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-4 text-yellow-400 hidden" id="full-heart-${tour.id}"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>`

        if (favoriteTours.includes(tour.id)) {
            iconEmptyHeart =`<svg xmlns=http://www.w3.org/2000/svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4 text-slate-500 hidden" id="empty-heart-${tour.id}"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`
            iconFullHeart =`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-4 text-yellow-400 flex" id="full-heart-${tour.id}"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>`
        } 

        boxTours.innerHTML += `
        
        <div class="shadow-2xl rounded-xl mt-20 flex flex-col justify-between bg-white">

            <img class="h-60 w-full object-center object-cover rounded-t-xl" src=${tour.image} alt=""/>

            <p class="text-sm text-end px-3 text-slate-600 font-base my-3">Рейтинг: ${tour.rating}</p>
            
            <div class="px-3 grow">
                <p class="text-lg font-bold">${tour.hotelName}</p>
                ${location}  
            </div>
            
            <p class="pl-3 pr-7 text-sm font-semibold pt-4">от <span class="text-xl text-sky-600">${formatedPrice}</span> руб</p>

            <div class="px-3 text-sm text-slate-600 mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>          
                <span class="pl-1">${format(new Date(tour.startTime),'dd.MM.yyyy')} - ${format(new Date(tour.endTime),'dd.MM.yyyy',)}</span>  
            </div>

            <div class="px-3 text-sm text-slate-600 mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="pl-1">${duration} ночей</span>
            </div>

            <div class="px-3 flex items-center justify-between">
                <button id="btn-book-${tour.id}" class="btn-primary border border-solid border-sky-600 w-1/2 my-6">Забронировать</button>
                <button id="btn-heart-${tour.id}">
                    ${iconEmptyHeart}
                    ${iconFullHeart}
                </button>
            </div>
        </div>   
        `  
    })

    tours.forEach((tour) => {
        const btnHeart = document.getElementById(`btn-heart-${tour.id}`)

        function makeAddToFavourites() {
            addToFavorites(tours, tour.id)
        }
        
        btnHeart.addEventListener('click', makeAddToFavourites)
    }) 

    tours.forEach((tour) => {
        const btnBook = document.getElementById(`btn-book-${tour.id}`)

        function makeOpenModalBook() {
            openModalBook(tours, tour.id)
        }
        btnBook.addEventListener('click', makeOpenModalBook)
    })
}

const modalWindow = document.getElementById('modal-window')
const modalWindowForm = document.getElementById('modal-window-form')

function openModalBook (tours, id) {

    const tour = tours.find((tour) => {
        return tour.id === id
    })
    currentTourId = tour.id
    console.log(currentTourId)

    const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))

    const currentFormatPrice = tour.price
    const formatedPrice = currentFormatPrice.toLocaleString('ru-RU')+'.00'

    let location = `<span class="text-sm text-slate-600 font-normal text-justify">${tour.city}, ${tour.country}</span>`

    if (tour.city == null ) {
        location = `<span class="text-sm text-slate-600 font-normal text-justify">${tour.country}</span>`
    }

    document.getElementById('render-selected-tour').innerHTML = `
    
    <div class="bg-white rounded-t-xl flex justify-between">
      
        <div>
            <div class="grow">
                 <p class="text-lg font-bold">${tour.hotelName}</p>
                 ${location}  
            </div>
        
            <p class="text-sm font-semibold pt-4">от <span class="text-xl text-sky-600">${formatedPrice}</span> руб</p>

            <div class="text-sm text-slate-600 mt-2 flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>          
               <span class="pl-1">${format(new Date(tour.startTime),'dd.MM.yyyy')} - ${format(new Date(tour.endTime),'dd.MM.yyyy',)}</span>  
            </div>

            <div class="text-sm text-slate-600 mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="pl-1">${duration} дней</span>
            </div> 
        </div>
        
        <div>
            <img class="h-40 w-full object-center object-cover rounded-xl" src=${tour.image} alt=""/>
        </div>                
    </div>
    `
    clearForm()
    modalWindow.classList.toggle('hidden')
    modalWindowForm.classList.toggle('hidden')
}

function toggleWindowFilterPrice() {
    document.getElementById('modal-window-min-max-price').classList.toggle('hidden')
}

// document.addEventListener('click', function(event) {
//     const containerFilterPrice = document.getElementById('container-filter-price')
//     const modalWindowFilterPrice = document.getElementById('modal-window-min-max-price')
 
//     console.log(event.target)
//     if (containerFilterPrice.contains(event.target)) {
//         modalWindowFilterPrice.style.display = 'flex'
//     } else {
//         modalWindowFilterPrice.style.display = 'none' 
//     }
//     console.log(containerFilterPrice.contains(event.target))
// })

function filterDuration (tours, event) {
    const option = event.target.options[event.target.selectedIndex]
    const allDuration = option.dataset.allduration
    const startDuration = option.dataset.startduration
    const endDuration = option.dataset.endduration
    const moreDuration = option.dataset.moreduration
    // console.log (option)
    // console.log(allDuration, startDuration, endDuration, moreDuration)

    if (allDuration == 0) {
        renderTours(tours)
    } else {
        const filteredDuration = tours.filter((tour) => {
            const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
            return duration >= startDuration && duration <= endDuration || duration >= moreDuration
        })
        renderTours(filteredDuration)
    } 
}

function filterPrice (tours) {
    const minPriceValue = document.getElementById('min-price').value
    const maxPriceValue = document.getElementById('max-price').value
    // console.log(minPriceValue, maxPriceValue)

    if (minPriceValue.length === 0 && maxPriceValue.length === 0) {
        renderTours(tours)
    } else {
        const filteredPrice = tours.filter((tour) => {
            return tour.price >= minPriceValue && tour.price <= maxPriceValue || tour.price >= minPriceValue && maxPriceValue.lenght === 0 || tour.price <= maxPriceValue && minPriceValue.lenght === 0    
        })
        renderTours(filteredPrice)
    } 
}

function filterRating (tours, event) {
    const rating = event.target.value

    const filteredTours = tours.filter((tour) => {
        return tour.rating >= rating
    }) 
    renderTours(filteredTours)
}

function filterCountry (tours, event) {
    const country = event.target.value
    // console.log(country)
    
    if (country) {
        const filteredTours = tours.filter((tour)=> {
            return tour.country === country
        })
        renderTours(filteredTours)
    } 
    if (country == 0) {
        renderTours(tours)
    }
}

function showAllTours (tours) {
    renderTours(tours)
}

function addToFavorites(tours, id) {

    if (favoriteTours.includes(id)) {
        const favoriteTour = favoriteTours.find((favoriteTour) => {
            return favoriteTour === id
        })
        const favoriteTourIndex = favoriteTours.indexOf(favoriteTour)
        favoriteTours.splice(favoriteTourIndex, 1)
        saveToLocalStorage(favoriteTours)

        if (isFavoritePage){
            filterToFavorite(tours)
        } else {
            renderTours(tours)
        }
        return
    } 

    favoriteTours.unshift(id)
    saveToLocalStorage(favoriteTours)
    if (isFavoritePage){
        filterToFavorite(tours)
    } else {
        renderTours(tours)
    }
}

const toursJson = localStorage.getItem('tours')
if (toursJson) {
    favoriteTours = JSON.parse(toursJson)
}

function filterToFavorite(tours) {
    isFavoritePage = true
    const filteredFavoriteTours = tours.filter((tour) => {
        return favoriteTours.includes(tour.id)   
    })
    // console.log(filteredFavoriteTours)
    renderTours(filteredFavoriteTours)     
}

function saveToLocalStorage(tours) {
    const toursJson = JSON.stringify(tours)
    localStorage.setItem('tours', toursJson)
}

async function bookTour() {   
    const nameValue = document.getElementById("name").value
    const phoneValue = document.getElementById("phone").value
    const emailValue = document.getElementById("email").value
    const discriptionValue = document.getElementById("discription").value

    if (nameValue.length === 0 || phoneValue.length === 0 || emailValue.length === 0) {
        alert("Необходимо заполнить все обязательные поля") 
        return
    } 

    const params = {
        customerName: nameValue,
        phone: phoneValue,
        email: emailValue, 
        discription: discriptionValue 
    }
    console.log(params)

    try {
        const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${currentTourId}`
        console.log(currentTourId)
        let response = await fetch(url, {
           method: "POST",
           body: JSON.stringify(params)
        })
        let data = await response.json()
        // console.log(data)

        modalWindowForm.classList.toggle('hidden')
        document.getElementById('modal-window-message').classList.toggle('hidden')

        document.getElementById('modal-window-message').innerHTML = `
            <div class="flex flex-col items-center">
                <p class="pt-5 text-slate-600 text-center">Запрос на бронирование тура успешно отправлен! В ближайщее время с Вами свяжется наш специалист.</p>
                <button id="btn-done" class="btn-primary border border-solid border-sky-600 w-1/2 my-6">Готово</button>
            </div>
        `
        
        document.getElementById('btn-done').addEventListener('click', () => {
            document.getElementById('modal-window-message').classList.toggle('hidden')
            modalWindow.classList.toggle('hidden')
        })

    } catch (error) {
        console.log (error)

        modalWindowForm.classList.toggle('hidden')
        document.getElementById('modal-window-message').classList.toggle('hidden')

        document.getElementById('modal-window-message').innerHTML = `
        <div class="flex flex-col items-center">
            <div>
                <img class="h-44 mt-8" src="/images/error.png" alt=""/>
                <p class="pt-5 text-black text-center">Упс. Что-то пошло не так</p>
            </div>
            <button id="btn-exit" class="btn-primary border border-solid border-sky-600 w-1/2 my-6">Выйти</button>
        </div>
        `
        
        document.getElementById('btn-exit').addEventListener('click', () => {
            document.getElementById('modal-window-message').classList.toggle("hidden")
            modalWindow.classList.toggle('hidden')
        })
    } 
}

function closeModalWindow() {
    modalWindow.classList.toggle('hidden')
    modalWindowForm.classList.toggle('hidden')
}

function clearForm() {
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("discription").value = ""
}

let tours 
const boxLoader = document.getElementById('box-loader')

if (!tours) {
    boxLoader.innerHTML = `
    <p class="py-52 text-center text-sm text-slate-500">Loading...</p>
    `
}

async function init() {
    const tours = await loadTours()

    if (tours) {
        renderTours(tours)
        boxLoader.innerHTML = ""
    }

    async function makeBookTour() {
        await bookTour()
    }
    
    renderUniqCountry(tours)
    renderDropdown(tours)
    
    document.getElementById("select-country").addEventListener('change', (event) => filterCountry(tours, event))
    document.getElementById("select-rating").addEventListener('change', (event) => filterRating(tours, event))
    document.getElementById("select-duration").addEventListener('change', (event) => filterDuration (tours, event)) 
    document.getElementById("btn-all-tours").addEventListener('click', () => showAllTours(tours))
    document.getElementById("btn-enter-min-max-price").addEventListener('click',toggleWindowFilterPrice)
    document.getElementById("btn-close-min-max-price").addEventListener('click',toggleWindowFilterPrice)
    document.getElementById("btn-close-min-max-price").addEventListener('click', () => filterPrice(tours))
    document.getElementById('btn-favorite').addEventListener('click', () => filterToFavorite(tours))
    document.getElementById('btn-send').addEventListener('click', makeBookTour)
    document.getElementById('btn-close-mw').addEventListener('click', closeModalWindow)
}

init()