import cheerio from 'cheerio'
import { fetch } from 'react-fetch'
let cacheReponse = false

export function titlesWithRating() {
  if(cacheReponse) return false

  const titles = fetchTitles()
  // console.log("END", titles)

  const result = titles.map(title => {
    const imbdID = fetchIMdbID(title)
    console.log({title})
    const rating = fetchRatingIMdb(imbdID)
    return {title, rating}
  })
  console.log("END", result)
  cacheReponse = result
  return result
  // return titles.map(it => ({title: it}))
}

function fetchScraping({url, selector, array = false}, callback = (node) => node.text()) {
  const data = fetch(url).text()
  const $ = cheerio.load(data)
  if (array) {
    return  $(selector).toArray().map(node => callback($(node)))
  }
  return callback($(selector))
}

export function fetchTitles() {
  return fetchScraping({ url: `https://www.ecartelera.com/cines/54,0,1.html`, selector: "div.lfilmbc.cajax > h4 > a > span", array: true})
}

export function fetchIMdbID(title) {
  return fetchScraping({ url: `https://www.imdb.com/find?q=${title}&ref_=nv_sr_sm`, selector: "td.result_text > a"}, (node) => {
    return node.attr('href')
  })
}

function fetchRatingIMdb(endpoint) {
  return fetchScraping({ url: `https://www.imdb.com${endpoint}`, selector: "div.imdbRating > div.ratingValue > strong > span" })
}

// main().then(console.log)
// fetchTitles().then(console.log)

// fetchIMdbID('Capitana Marvel').then(console.log)

// fetchRatingIMdb('/title/tt4154664/?ref_=fn_al_tt_1').then(console.log)
