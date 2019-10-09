module.exports = {
	/**
	  * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
	  * images to fit into a certain area.
	  *
	  * @param {Number} srcWidth Source area width
	  * @param {Number} srcHeight Source area height
	  * @param {Number} maxWidth Fittable area maximum available width
	  * @param {Number} maxHeight Fittable area maximum available height
	  * @return {Object} { width, height }
	  */
	calculateAspectRatioFit: function (srcWidth, srcHeight, maxWidth, maxHeight) {

		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

		return { width: srcWidth*ratio, height: srcHeight*ratio };
	},

	parseImageUrlIS: function (object) {

		var start = object.image.indexOf("url=");
		var end = object.image.indexOf("type=");
		var width = object.image.indexOf("width");
		if (width !== 0) {
			object.imgWidth = object.image.substring(width + 7, width + 10);
			object.imgHeight = object.image.substring(width + 7, width + 10);
		}
		object.image = object.image.substring(start + 5, end - 2);
	},

	parseImageUrl: function (object) {

		var start = object.image.indexOf("url=");
		var height = object.image.indexOf("height");
		var width = object.image.indexOf("width");
			
		if (width > height) {
			object.imgHeight = object.image.substring(height + 8, width - 2);
			object.imgWidth = object.image.substring(width + 7, object.image.length - 3);
		} else {
			object.imgWidth = object.image.substring(width + 7, height - 2);
			object.imgHeight = object.image.substring(height + 8, start - 2);
		}
		
		object.image = object.image.substring(start + 5, object.image.length - 3);
	},

	addNewsToHTML: function (news) {

		var sortedNews=[];
		for (var i = 0; i < news.length; i++) {
			sortedNews.push(news[i]);
		}
		
		sortedNews = sortArray(sortedNews);
		
		var htmlPage = '<!DOCTYPE html><html><head><link rel = "stylesheet" type = "text/css" href = "uutisetMini.css"/></head><body>';
		
		/*for (var i = 0; i < sortedNews.length; i++) {
			var br = document.createElement('br');
			var br1 = document.createElement('br');
			var br2 = document.createElement('br');
			var a = document.createElement('a');
			var a1 = document.createElement('a');
			var img = document.createElement('img');
			var linkText = document.createTextNode(sortedNews[i].title);

			a.appendChild(linkText);
			a.title = sortedNews[i].title;
			a.href = sortedNews[i].link;

			var imgObject = calculateAspectRatioFit(sortedNews[i].imgWidth, sortedNews[i].imgHeight, 600, 150);
			img.src = sortedNews[i].image;
			img.height = imgObject.height;
			img.width = imgObject.width;
			
			a1.href = sortedNews[i].link;
			a1.appendChild(img);
			
			document.body.appendChild(br2);
			document.body.appendChild(a);
			document.body.appendChild(br);
			document.body.appendChild(a1);
			document.body.appendChild(br1);

		}*/
		
		htmlPage = htmlPage + '</body></html>';
		return htmlPage;
	},

	sortArray: function (array) {
		
		return array.sort(function (a, b) {
			var dateA = new Date(a.published);
			var dateB = new Date(b.published);
			
			return (dateB - dateA);
		});
	}
} // End exports