


function isInEurope(value) {
	return value.eu === true;
}

function sortBuildings(a, b) {
	return b.height_ft - a.height_ft; 
}

const img = document.querySelector('.image');
const buildingName = document.querySelector('.building-name');

const buildingHeight = document.querySelector('.height');
const buildingCity = document.querySelector('.city');
const buildingCountry = document.querySelector('.country');
const BuildingFloors = document.querySelector('.floors');
const buildingCompleted = document.querySelector('.completed');

function barClicked(d) {
	img.src = `./imgs/${d.image}`;
	buildingName.innerHTML = d.building;
	buildingHeight.innerHTML = `${d.height_ft} ft`;
	buildingCity.innerHTML = d.city;
	buildingCountry.innerHTML = d.country;
	BuildingFloors.innerHTML = `${d.floors}`;
	buildingCompleted.innerHTML = `${d.completed}`;
}

d3.csv('./data/cities.csv', d3.autoType).then(data => {
	let filteredCities;
	const width = 700;
	const height = 550;

	filteredCities = data.filter(isInEurope);

	d3.select('.city-count').text(`Number of Cities: ${filteredCities.length}`);

	const svg = d3.select('.population-plot').append('svg')
    	.attr('width', width)
		.attr('height', height)
		.attr('class', 'svg1');
		
	
	svg.selectAll(".circles")
		.data(filteredCities)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		})
		.attr('r', function(d) {
			if (d.population <= 1000000) {
				return 4;
			} else {
				return 8;
			}
		})
		.attr('fill', 'blue')
		.attr('class', 'circles');

	svg.selectAll('.texts')
		.data(filteredCities)
		.enter()
		.append('text')
		.text(function(d) {
			return (`${d.country}`);
		})
		.attr('x', function(d) {
			return d.x;
		})
		.attr('y', function(d) {
			return d.y;
		})
		.attr('dy', -12)
		.attr('opacity', function(d) {
			if(d.population >= 1000000) {
				return 1;
			}
			return 0;
		})
		.attr('text-anchor', 'middle')
		.attr('class', 'texts');

	console.log('cities', filteredCities);
});


d3.csv('./data/buildings.csv', d3.autoType).then(data => {
	const sortedBuildings = data.sort(sortBuildings);

	const width = 600;
	const height = 500;
	const barPadding = 10;

	const svg = d3.select('.bar-chart').append('svg')
    	.attr('width', width)
		.attr('height', height);

	svg.selectAll(".rects")
	.data(sortedBuildings)
	.enter()
	.append("rect")
	.attr('y', function(d,i) {
		return i * (height / sortedBuildings.length);
	})
	.attr('x', 250)
	.attr('height', height / sortedBuildings.length - barPadding)
	.attr('width', function(d) {
		return d.height_px;
	})
	.attr('fill', "orange")
	.attr('class', 'rects')
	.on('click', function(e, d) {
		console.log(d);
		barClicked(d);
	});


	svg.selectAll(".txt")
	.data(sortedBuildings)
	.enter()
	.append("text")
	.text(function(d) {
		return (`${d.height_ft} ft`);
	})
	.attr('y', function(d,i) {
		return i * (height / sortedBuildings.length) + (height / sortedBuildings.length - barPadding) / 2;
	})
	.attr('x', function(d) {
		return d.height_px + 250;
	})
	.attr('dx', -10)
	.attr('dy', 5)
	.attr('text-anchor', 'end')
	.attr('class', 'txt');


	svg.selectAll(".txts")
	.data(sortedBuildings)
	.enter()
	.append("text")
	.text(function(d) {
		return (`${d.building}`);
	})
	.attr('y', function(d,i) {
		return i * (height / sortedBuildings.length) + (height / sortedBuildings.length - barPadding) / 2;
	})
	.attr('x', 0)
	.attr('dy', 5)
	.attr('class', 'txts');


	
	console.log('buildings', sortedBuildings);

});



