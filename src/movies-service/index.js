const axios = require('axios').default
const cheerio = require('cheerio')

async function fetchScraping({url, selector, array = false}, callback = (node) => node.text()) {
  const {data} = await axios.get(url)
  const $ = cheerio.load(data)
  if (array) {
    return  $(selector).toArray().map(node => callback($(node)))
  }
  return callback($(selector))
}

async function main() {
  const titles = await fetchTitles()
  const result = Promise.all(titles.map(async title => {
    const imbdID = await fetchIMdbID(title)
    const rating = await fetchRatingIMdb(imbdID)
    return {title, rating}
  }))
  return result
}

async function fetchTitles() {
  return fetchScraping({ url: `https://www.ecartelera.com/cines/54,0,1.html`, selector: "div.lfilmbc.cajax > h4 > a > span", array: true})
}

async function fetchIMdbID(title) {
  return fetchScraping({ url: `https://www.imdb.com/find?q=${title}&ref_=nv_sr_sm`, selector: "td.result_text > a"}, (node) => {
    return node.attr('href')
  })
}

async function fetchRatingIMdb(endpoint, selector) {
  const {data} = await axios.get(`https://www.imdb.com${endpoint}`)
  const $ = cheerio.load(data)
  return $("div.imdbRating > div.ratingValue > strong > span").text()
}

// main().then(console.log)
// fetchTitles().then(console.log)

// fetchIMdbID('Capitana Marvel').then(console.log)

// fetchRatingIMdb('/title/tt4154664/?ref_=fn_al_tt_1').then(console.log)
