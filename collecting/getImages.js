
//-----------------------------read files from html returns----------------------------

//http://resolver.kb.nl/resolve?urn=urn:gvn:GMDH02:00425&size=large

const link1 = `http://resolver.kb.nl/resolve?urn=urn:gvn:`, link2 =`&size=large`;

const fs = require('fs');
const axios = require('axios');

const regexID = /<article id=".+" data-identifier/gi;
const regexNum = /Isotype.+?<\/h2>/gi;

/*

fs.readFile('sources/05_Memory of the Netherlands.html', 'utf8', (err,data)=>{
	//console.log(data);
	var id = getWebId(data);
	var iso = getIsoId(data);

	console.log(id.length, iso.length);

	var listObj= id.map((webId, i)=> {
		return {
			link: link1+webId+link2,
			name: iso[i]
		}
	});

	fs.writeFileSync(`./05.js`, 'var list1='+JSON.stringify(listObj)+';\r module.exports=list5;');

});

const getWebId = (text)=>{

	var each = text.match(regexID).map(match=>{
		var identifiers = match.replace('<article id="', '').replace('" data-identifier', '');
		return identifiers.trim();
	});

	return each;
}


const getIsoId = (text)=>{

	var entries = text.match(regexNum).map(match=>{
		var identifier = match.replace('<\/h2>', '');
		return identifier.trim();
	});

	return entries;
}

*/


//-------------------2) this then batch downloads the images---------------------------------

const list5 = require('./05.js');

var image=0;
var err=0;

var list = fs.readdirSync('./img');

const checkDownload = (files, dirList) => {

	var remaining = files.filter(file=>{
		return !dirList.includes(file.name+'.jpg');
	});

	return remaining;
}

var rem = checkDownload(list5, list);

console.log(rem);


rem.forEach((item, i)=>{
	if (item.link!==undefined){


			var address = item.link;

			axios({
				  method:'get',
				  url:address,
				  responseType:'stream'
				})
				.then(res=>{
					image ++;
					var name = item.name;
						res.data.pipe(fs.createWriteStream(`${name}.jpg`))
				})
				.catch(function (error) {
					err++
			    console.log('error', err, error.message);
			  });
		}

})


//console.log(image);





