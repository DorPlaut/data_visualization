import styles from './styles/ChoroplethMap.module.css';
import React from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';

function ChoroplethMap() {
  // size
  const w = 940;
  const h = 650;
  const padding = 10;

  // fetch data
  const url =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
  const urlMap =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

  const getData = async (mapData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      chart(data, mapData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getMapData = async () => {
    try {
      const response = await fetch(urlMap);
      const data = await response.json();
      getData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getMapData();

  // SET CHART
  const chart = (data, mapData) => {
    // chart vars

    //  path generator
    const path = d3.geoPath();

    // colors
    const color = d3
      .scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
      .range(d3.schemeBrBG[7]);
    const keysRange = color.domain();

    // topo json - format the map data
    const features = topojson.feature(
      mapData,
      mapData.objects.counties
    ).features;
    const states = topojson.mesh(
      mapData,
      mapData.objects.states,
      (a, b) => a !== b
    );

    // legend scale
    const legendScale = d3
      .scaleLinear()
      .domain([0, color.range().length])
      .range([
        w / 2 - (50 * color.range().length) / 2,
        w / 2 - (50 * color.range().length) / 2 + 50 * color.range().length,
      ]);
    const legendAxis = d3
      .axisBottom(legendScale)
      .tickFormat((d) => {
        return keysRange[d].toFixed(0) + '%';
      })
      .tickSizeOuter(0)
      .ticks(color.range().length);

    // SVG
    // append
    const svg = d3.select('#svg');
    //
    // legend
    const legend = svg.append('g').attr('class', styles.legend);

    legend.append('g').attr('transform', `translate( 0 ,50 )`).call(legendAxis);
    legend
      .selectAll('.rect')
      .data(color.range())
      .enter()
      .append('rect')
      .attr('x', (d, i) => w / 2 - (50 * color.range().length) / 2 + i * 50)
      .attr('y', (d, i) => 0)
      .attr('height', (d, i) => 50)
      .attr('width', (d, i) => 50)
      .attr('fill', (d, i) => d);

    // MAP
    // add the map
    svg
      .append('g')
      .attr('class', styles.counties)
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')

      .attr('class', styles.county)
      // add fips
      .attr('data-fips', (d) => d.id)
      // add data
      .attr('data-education', (d) => {
        const result = data.filter((obj) => obj.fips === d.id);
        return result[0].bachelorsOrHigher;
      })
      // color
      .attr('fill', function (d) {
        const result = data.filter((obj) => obj.fips === d.id);
        return color(result[0].bachelorsOrHigher);
      })
      .attr('d', path)
      .attr('x', 122)
      .attr('transform', `translate( 0 ,40 )`)
      // handke tooltip tag
      .on('mouseover', (e, d) => {
        const result = data.filter((obj) => obj.fips === d.id)[0];
        tag.classList.add(styles.visible);
        tag.setAttribute('data-education', result.bachelorsOrHigher);
        tag.innerHTML = ` <h4>${result.area_name}, ${result.state}: ${result.bachelorsOrHigher}%</h4>`;
      })
      .on('mouseleave', (d, i) => {
        tag.classList.remove(styles.visible);
      });
    // tag placemant
    const tag = document.querySelector('#tag');
    document.addEventListener('mousemove', (d) => {
      tag.style.transform = 'translateY(' + (d.clientY - 0) + 'px)';
      tag.style.transform += 'translateX(' + (d.clientX - 0) + 'px)';
    });

    // state borders
    svg
      .append('path')
      .datum(states)
      .attr('class', styles.states)
      .attr('d', path)
      .attr('transform', `translate( 0 ,40 )`);
  };

  return (
    <div className={styles.body}>
      <h1 class={styles.title}>United States Educational Attainment</h1>
      <h3 class={styles.description}>
        Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)
      </h3>
      <div className={styles.chart}>
        <svg width={w} height={h} id="svg"></svg>
      </div>
      <div
        id="tag"
        className={styles.tag}
        classList={styles.tooltip}
        data-education="0"
      ></div>
    </div>
  );
}

export default ChoroplethMap;
