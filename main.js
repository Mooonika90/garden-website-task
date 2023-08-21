const searchBtn = document.querySelector('.form-control')
const gridTemplate = document.querySelector('.grid-template')
const showYear = document.querySelector('.show-year')

showYear.textContent = new Date().getFullYear()

const loadMoreButton = document.querySelector('.btn-show')
let currentPage = 1
const scrollButton = document.querySelector('.btn-scroll')

// const msnry = new Macy({
// 	container: '.grid-template',
// 	mobileFirst: true,
// 	columns: 1,
// 	trueOrder: false,
// 	waitForImages: false,
// 	useImageLoader: true,
// 	breakAt: {
// 		500: 2,
// 		700: 3,
// 	},
// 	margin: {
// 		x: 20,
// 		y: 20,
// 	},
// })

const UNSPLASH_BASE_URL = 'https://api.unsplash.com'

const UNSPLASH_ACCESS_KEYS = [
	'AZBbGXFEvEU2PX9hmILrqz6cw3Y37ysQgfbco-u3yq4',
	'mxzpMqvANNTWT9rCn6rcxtx2S2l3XDdI-4aSmCAOlwo',
]

const index = Math.floor(Math.random() * UNSPLASH_ACCESS_KEYS.length)

const UNSPLASH_ACCESS_KEY = UNSPLASH_ACCESS_KEYS[index]

const UNSPLASH_COMMON_HEADERS = {
	Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
}

// const fixBug = () => {
// 	msnry.runOnImageLoad(function () {
// 		msnry.recalculate(true, true)
// 		const event = new UIEvent('resize', {
// 			view: window,
// 			bubbles: true,
// 			cancelable: false,
// 		})
// 		window.dispatchEvent(event)
// 	}, true)
// }

function fetchImages(page) {
	return fetch(`https://api.unsplash.com/search/photos?page=${page}&query=garden-design`, {
		headers: {
			...UNSPLASH_COMMON_HEADERS,
		},
	})
		.then(res => res.json())
		.then(data => {
			const imageElements = data.results.map(photo => {
				const img = document.createElement('img')
				img.src = photo.urls.regular
				img.alt = photo.alt_description

				const aLink = document.createElement('a')
				aLink.href = photo.urls.regular
				aLink.classList.add('fancybox')
				aLink.dataset.fancybox = 'gallery'
				aLink.dataset.aos = 'zoom-out'
				aLink.appendChild(img)
				return aLink
			})

			gridTemplate.append(...imageElements)
			
		})
		.catch(error => console.error('Error fetching more images:', error))
}

function initPhoto() {
	fetchImages(currentPage)
	// fixBug()
}
initPhoto()
loadMoreButton.addEventListener('click', () => {
	currentPage++
	fetchImages(currentPage)
	// fixBug()
})

const showButton = () => {
	if (document.documentElement.scrollTop <= 150) {
		scrollButton.style.display = 'none'
	} else {
		scrollButton.style.display = 'block'
	}
}

showButton()

scrollButton.addEventListener('click', () => {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
})

document.addEventListener('scroll', e => {
	showButton()
})
