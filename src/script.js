let tours = [
    {
        image:'images/Batur.jpg',
        title:'Рассвет на вулкане Батур',
        discription:'Восхождение на Батур потребует силы и выносливости, но оно того стоит. Это один из действующих вулканов Индонезии, второй по величине на Бали. Внутри кальдеры высотой 1717 метров над уровнем моря находится озеро, а вокруг него – вулканические конусы и кратеры. Особенно впечатляет пейзаж на рассвете, когда вулкан и озеро окутывает розово-голубой утренний туман.',
        price:'от 3 500 руб',
        duration:'9 ч',
        location:'о. Бали'
    },
    {
        image:'images/Gili.jpg',
        title:'Райские острова Гили',
        discription:'Острова Гили по праву называют островами "черепах", ведь именно здесь обитают несколько видов гигантских морских черепах, также Гили знамениты красивейшими пляжами с белым песком, вкуснейшими блюдами из морепродуктов и потрясающими закатами.',
        price:'от 8 000 руб',
        duration:'от 2-х дней',
        location:'о. Гили Траванган'
    },
    {
        image:'images/Sekumpul.jpg',
        title:'Спуск к водопаду Секумпул',
        discription:'Путь к группе водопадов Секумпул лежит через красивейшие джунги, среди побегов кофе и гвоздики. Сам же водопад Секумпул является самым большим и красивым на Бали, высота водопада достигает 70-80 метров, а для местного населения он является светым местом и был открыт к посещению относительно недавно.',
        price:'от 2 700 руб',
        duration:'7 ч',
        location:'о. Бали'
    }  
]

function renderTours() {
    const boxTours = document.getElementById('box-tours')
    boxTours.innerHTML = ""
    tours.forEach((tour) => {
        boxTours.innerHTML += `
        
        <div class="shadow-2xl rounded-xl mt-20 flex flex-col justify-between bg-white">

            <img class="h-60 w-full object-center object-cover rounded-t-xl" src=${tour.image} alt=""/>
            
            <div class="px-3 grow">
                <p class="text-lg font-bold my-5">${tour.title}</p>
                <p class="text-sm text-slate-600 font-normal text-justify">${tour.discription}</p>
            </div>
            
            <p class="pl-3 pr-7 text-sm text-sky-600 font-semibold pt-4 text-end">${tour.price}</p>

            <div class="px-3 text-sm text-slate-600 mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg
                <span class="pl-1">${tour.duration}</span>
                <span class="px-1">&middot;</span>
                <svg xmlns=http://www.w3.org/2000/svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                <span class="pl-1">${tour.location}</span>
            </div>

            <div class="px-3 flex items-center justify-between">
                <button class="btn-primary border border-solid border-sky-600 w-1/2 my-6">Подробнее</button>
                <button><svg xmlns=http://www.w3.org/2000/svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4 text-slate-500"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg></button>
            </div>

        </div>
        ` 
    })
}

renderTours()