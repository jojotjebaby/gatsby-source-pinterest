const {
  scrapingPinterestBoardsFromAccount,
  scrapingPinterestPinsFromBoard,
} = require("./pinterest")

const defaultOptions = {
  type: `account`,
}

async function getPinterestBoards(options) {
  let data = await scrapingPinterestBoardsFromAccount(options)

  // We now have the boards, fetch the pins of the different boards.
}

async function getPinterestBoardPins(options) {}

exports.sourceNodes = async (
  { actions, store, cache, createNodeId },
  options
) => {
  const { createNode, touchNode } = actions
  const params = { ...defaultOptions, ...options }
  let data

  // Get all the boards for an account
  if (params.type === `account`) {
    data = await getPinterestBoards(params)
  } else if (params.type === `board`) {
    data = await getPinterestBoardPins(params)
  } else {
    console.warn(
      `The type ${params.type} provided in the gatsby-source-pinterest option is unknown`
    )
  }
}
