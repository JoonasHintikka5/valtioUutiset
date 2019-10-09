var feed = require('feed-read'),  // require the feed-read module
    http = require("http"),
	fs = require('fs'),
	logic = require("./uutisetLogic"),
	titles = [
		"Ulkoasiainministeriö:",
		"Oikeusministeriö:",
		"Valtiovarainministeriö:",
		"OpetusjaKulttuuriministeriö:",
		/*"MaajaMetsätalousministeriö tiedotteet:",
		"MaajaMetsätalousministeriö uutiset:",*/
		"MaajaMetsätalousministeriö",
		/*"LiikennejaViestintäministeriö tiedotteet:",
		"LiikennejaViestintäministeriö uutiset:",*/
		"LiikennejaViestintäministeriö",
		"TyöjaElinkeinoministeriö:",
		/*"SosiaalijaTerveysministeriö tiedotteet:",
		"SosiaalijaTerveysministeriö uutiset:",*/
		"SosiaalijaTerveysministeriö",
		"Valtioneuvosto:",
		"Ympäristöministeriö:",
		"Sisäministeriö",
		"Puolustusministeriö"
	],
    urls = [
		"https://um.fi/o/rss?dctype=asset&lang=fi_FI&aid=GRSnUwaHDPv5&plid=45074",
		"http://oikeusministerio.fi/ajankohtaista/-/asset_publisher/US1KRgHxOh0c/rss",
        "http://vm.fi/ajankohtaista/-/asset_publisher/RhzFRyKj5aHx/rss",
        "http://minedu.fi/ajankohtaista/-/asset_publisher/HplCdJTXh1mx/rss",
        "http://mmm.fi/ajankohtaista/-/asset_publisher/U5Q6niKDcw1W/rss",
		"https://www.lvm.fi/ajankohtaista/-/asset_publisher/8upbyPg44nql/rss",
		"http://tem.fi/ajankohtaista/-/asset_publisher/8Xz6i80bsR54/rss",
		"https://stm.fi/ajankohtaista/-/asset_publisher/QGPfXenrI9A4/rss",
		"http://valtioneuvosto.fi/etusivu/-/asset_publisher/g7mRhX1nEn6S/rss",
		"http://www.ym.fi/fi-FI/genericrss/?n=25523&itemcount=50&d=0&contentlan=1&templateid=9#",
		"http://intermin.fi/ajankohtaista/uutiset/-/asset_publisher/ajcbJYZLUABn/rss",
		"http://www.defmin.fi/rss/puolustusministerio_uutiset_ja_tiedotteet"
    ]; // RSS Feeds

var sortedNews=[];
var months = Array("Tammikuuta", "Helmikuuta", "Maaliskuuta", "Huhtikuuta", "Toukokuuta", "Kesäkuuta",
					"Heinäkuuta", "Elokuuta", "Syyskuuta", "Lokakuuta", "Marraskuuta", "Joulukuuta");

fs.readFile('./css/valtioUutiset.css', function(err, data) {
    if (err){
        throw err;
    }
    cssFile = data;
});

http.createServer(function (req, res) { 

	switch (req.url) {
        case "/uutiset.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(cssFile);
			res.end();
			return;
            break;
    }
    

    // send basic http headers to client
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Transfer-Encoding": "chunked"
    });

	sortedNews=[];
    // setup simple html page:
    res.write('<html>\n<head>\n<link rel = "stylesheet" type = "text/css" href = "uutiset.css"/><title>Uutiset</title>\n</head>\n<body>');
	
	// fetch rss feed for the url:
	feed(urls[0], function(err, articles) {
		// loop through the list of articles returned
		for (var i = 0; i < articles.length; i++) {
			var start = articles[i].feed.name.indexOf(":");
			if (start !== -1)
				articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
			sortedNews.push(articles[i]);
			if( i === articles.length - 1) {
				// fetch rss feed for the url:
				feed(urls[1], function(err, articles) {
					// loop through the list of articles returned
					for (var i = 0; i < articles.length; i++) {
						var start = articles[i].feed.name.indexOf("I");
						if (start !== -1)
							articles[i].feed.name = articles[i].feed.name.substring(start, articles[i].feed.name.length);
						sortedNews.push(articles[i]);
						if( i === articles.length - 1) {
							feed(urls[2], function(err, articles) {
								// loop through the list of articles returned
								for (var i = 0; i < articles.length; i++) {
									var start = articles[i].feed.name.indexOf(" ");
									if (start !== -1)
										articles[i].feed.name = articles[i].feed.name.substring(0, start);
									sortedNews.push(articles[i]);
									if( i === articles.length - 1) {
										feed(urls[3], function(err, articles) {
											// loop through the list of articles returned
											for (var i = 0; i < articles.length; i++) {
												var start = articles[i].feed.name.indexOf(":");
												if (start !== -1)
													articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
												sortedNews.push(articles[i]);
												if( i === articles.length - 1) {
													feed(urls[4], function(err, articles) {
														// loop through the list of articles returned
														for (var i = 0; i < articles.length; i++) {
															var start = articles[i].feed.name.indexOf(".");
															if (start !== -1)
																articles[i].feed.name = articles[i].feed.name.substring(0, start);
															sortedNews.push(articles[i]);
															if( i === articles.length - 1) {
																feed(urls[5], function(err, articles) {
																	// loop through the list of articles returned
																	for (var i = 0; i < articles.length; i++) {
																		sortedNews.push(articles[i]);
																		if( i === articles.length - 1) {
																			feed(urls[6], function(err, articles) {
																				// loop through the list of articles returned
																				for (var i = 0; i < articles.length; i++) {
																					//var start = articles[i].feed.name.indexOf("-");
																					if (start !== -1)
																						articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																					sortedNews.push(articles[i]);
																					if( i === articles.length - 1) {
																						feed(urls[7], function(err, articles) {
																							// loop through the list of articles returned
																							for (var i = 0; i < articles.length; i++) {
																								//var start = articles[i].feed.name.indexOf("-");
																								if (start !== -1)
																									articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																								sortedNews.push(articles[i]);
																								if( i === articles.length - 1) {
																									feed(urls[8], function(err, articles) {
																										// loop through the list of articles returned
																										for (var i = 0; i < articles.length; i++) {
																											var start = articles[i].feed.name.indexOf(".");
																											if (start !== -1)
																												articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																											sortedNews.push(articles[i]);
																											if( i === articles.length - 1) {
																												feed(urls[9], function(err, articles) {
																													// loop through the list of articles returned
																													for (var i = 0; i < articles.length; i++) {
																														var start = articles[i].feed.name.indexOf(".");
																														if (start !== -1)
																															articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																														sortedNews.push(articles[i]);
																														if( i === articles.length - 1) {
																															feed(urls[10], function(err, articles) {
																																// loop through the list of articles returned
																																for (var i = 0; i < articles.length; i++) {
																																	var start = articles[i].feed.name.indexOf(".");
																																	if (start !== -1)
																																		articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																																	sortedNews.push(articles[i]);
																																	if( i === articles.length - 1) {
																																		feed(urls[11], function(err, articles) {
																																			// loop through the list of articles returned
																																			for (var i = 0; i < articles.length; i++) {
																																				var start = articles[i].feed.name.indexOf(".");
																																				if (start !== -1)
																																					articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																																				sortedNews.push(articles[i]);
																																				/*if( i === articles.length - 1) {
																																					feed(urls[12], function(err, articles) {
																																						// loop through the list of articles returned
																																						for (var i = 0; i < articles.length; i++) {
																																							var start = articles[i].feed.name.indexOf(".");
																																							if (start !== -1)
																																								articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																																							sortedNews.push(articles[i]);
																																							if( i === articles.length - 1) {
																																								feed(urls[13], function(err, articles) {
																																									// loop through the list of articles returned
																																									for (var i = 0; i < articles.length; i++) {
																																										var start = articles[i].feed.name.indexOf("-");
																																										if (start !== -1)
																																											articles[i].feed.name = articles[i].feed.name.substring(0, start - 1);
																																										sortedNews.push(articles[i]);
																																										*/if( i === articles.length - 1) {
																																											sortedNews = logic.sortArray(sortedNews);
																																											
																																											for (var j = 0; j < sortedNews.length; j++) {
																																												var date = new Date(sortedNews[j].published);
																																												var hours = date.getHours();
																																												var minutes = date.getMinutes();
																																												var CSSClass = "";
																																												if (sortedNews[j].feed.name.includes("Tiedotteet")) {
																																													if (sortedNews[j].feed.name.length === 10) {
																																														if (sortedNews[j].feed.link.includes("mmm")) {
																																															sortedNews[j].feed.name = "Maa- ja Metsätalousministeriö";
																																															//CSSClass = "mmm";
																																														} else if (sortedNews[j].feed.link.includes("lvm")) {
																																															sortedNews[j].feed.name = "Liikenne- ja Viestintäministeriö";
																																															//CSSClass = "lvm";
																																														} else if (sortedNews[j].feed.link.includes("ym")) {
																																															sortedNews[j].feed.name = "Ympäristöministeriö";
																																															//CSSClass = "ym";
																																														}
																																													} else {
																																														sortedNews[j].feed.name = "Oikeusministeriö";
																																														//CSSClass = "om";
																																													}
																																												} else if (sortedNews[j].feed.name.includes("Uutiset")) {
																																													if (sortedNews[j].feed.name.length === 7) {
																																														if (sortedNews[j].feed.link.includes("mmm")) {
																																															sortedNews[j].feed.name = "Maa- ja Metsätalousministeriö";
																																															//CSSClass = "mmm";
																																														} else if (sortedNews[j].feed.link.includes("lvm")) {
																																															sortedNews[j].feed.name = "Liikenne- ja Viestintäministeriö";
																																															//CSSClass = "lvm";
																																														}
																																													}
																																												}/* else if (sortedNews[j].feed.name.includes("STM")) {
																																													CSSClass = "stm";
																																												} else if (sortedNews[j].feed.name.includes("TEM")) {
																																													CSSClass = "tem";
																																												} else if (sortedNews[j].feed.name.includes("Valtiovarainministeriö")) {
																																													CSSClass = "vvm";
																																												} else if (sortedNews[j].feed.name.includes("Ulkoasiainministeri")) {
																																													CSSClass = "um";
																																												} else if (sortedNews[j].feed.name.includes("RT")) {
																																													CSSClass = "ym";
																																												}*/ else if (sortedNews[j].feed.name.includes("Uusimmat")) {
																																													//CSSClass = "vn";
																																													sortedNews[j].feed.name = "Valtioneuvosto";
																																												}
																																												
																																												if (hours < 10)
																																													hours = "0" + hours;
																																												if (minutes < 10)
																																													minutes = "0" + minutes;
																																												
																																												res.write('<br><h3 class="' + CSSClass + '">' + sortedNews[j].feed.name + ': </h3><a href="' + sortedNews[j].link + '">' + sortedNews[j].title + '  </a>' +
																																															'<h4 class="time">' + hours + ":" + minutes + ' ' + date.getDate() + ". " +
																																															months[date.getMonth()] + " " + date.getFullYear() + '</h4><br>');
																																											}
																																											res.end("</body>\n</html>"); // end http response
																																										}
																																									/*}
																																								}); // end call to feed (feed-read) method
																																							}*/
																																						/*}
																																					}); // end call to feed (feed-read) method
																																				}*/
																																			}
																																		}); // end call to feed (feed-read) method
																																	}
																																}
																															}); // end call to feed (feed-read) method
																														}
																													}
																												}); // end call to feed (feed-read) method																									
																											}
																										}	
																									}); // end call to feed (feed-read) method
																								}
																							}
																						}); // end call to feed (feed-read) method
																					}
																				}
																			}); // end call to feed (feed-read) method
																		}
																	}
																}); // end call to feed (feed-read) method
															}
														}
													}); // end call to feed (feed-read) method
												}
											}
										}); // end call to feed (feed-read) method
									}
								}
							}); // end call to feed (feed-read) method
						}
					}
				}); // end call to feed (feed-read) method
			} // else still have rss urls to check
		} //  end inner for loop
	}); // end call to feed (feed-read) method
}).listen(3000);