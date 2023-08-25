const cheerio = require("cheerio")
const axios = require("axios")
const prefixURL = "https://epicgames.com";
let gameArray = [];

async function fetchHTML(url) {
  try {
	  const { data } = await axios.get(url)
	  return cheerio.load(data)
	} catch(err) {
		console.log(err)
	}  
}

const scrapeData = async (url) => {
	try {
		const $ = await fetchHTML(url)
		$('.css-1a48279-DiscoverCardLayout__link').each(function() {
			gameArray.push({
				"name": $(this).find('.css-2ucwu').text(), 
				"developer": $(this).find('.css-657o8l-StoreOfferTitleInfo__ellipsis').text(), 
				"link": prefixURL.concat($(this).attr('href')),
				"imageUrl": $(this).find('img').attr('data-image'),
				"price": $(this).find('.css-1mc6sjq').text(),
				"discount": $(this).find('.css-lkp3wl-PDPDiscountTag__tag').text() ? $(this).find('.css-lkp3wl-PDPDiscountTag__tag').text() : '0%'})
		})	
		//console.log(gameArray);
		return gameArray;
	} catch(error) {
		console.log(error)
	}	
}

module.exports = scrapeData