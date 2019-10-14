const axios = require(`axios`)
const cheerio = require(`cheerio`)

const parseUserProfileResponse = response => {
  const $ = cheerio.load(response.data)
  const boards = []
  const boardHyperlinkTags = $(`html > body > .UserProfileContent > a`)

  boardHyperlinkTags.forEach(tag => {
    boards.push({ url: tag.getAttribute(`href`) })
  })

  return boards
}

const parseBoardResponse = response => {
  const $ = cheerio.load(response.data)
  const pins = []
  const pinElements = $(`html > body > .Pin > img`)

  pinElements.forEach(tag => {
    pins.push({
      title: tag.getAttribute(`alt`),
      src: tag.getAttribute(`src`),
      srcset: tag.getAttribute(`srcset`),
    })
  })
}

export async function scrapingPinterestBoardsFromAccount({ username }) {
  return axios
    .get(`https://www.pinterest.com/${username}/boards/`)
    .then(response => {
      const data = parseUserProfileResponse(response)

      return data
    })
    .catch(err => {
      console.warn(`\nCould not fetch Pinterest profile. Error status ${err}`)
      return null
    })
}

export async function scrapingPinterestPinsFromBoard({ url }) {
  return axios
    .get(url)
    .then(response => {
      const data = parseBoardResponse(response)

      return data
    })
    .catch(err => {
      console.warn(`\nCould not fetch Pinterest profile. Error status ${err}`)
      return null
    })
}
