import styles from './styles/Treemap.module.css';
import React from 'react';
import * as d3 from 'd3';
// redux
import { useSelector } from 'react-redux';

function Treemap() {
  // redux
  const isMobile = useSelector((state) => state.isMobile.value);

  // size
  let w = 1300;
  let h = 800;
  let legendHeight = h / 15;
  let padding = 1;
  if (isMobile) {
    w = w * 0.35;
    h = h * 0.35;
    padding = padding * 0.35;
    legendHeight = legendHeight * 0.35;
  }
  // fetch data
  const url =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      chart(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getData();

  // SET CHART
  // chart vars
  const chart = (dataSet) => {
    // tree map
    const treemap = d3
      .treemap()
      .size([w, h - legendHeight])
      .padding(padding)
      .round(true);
    const root = d3.hierarchy(dataSet).sum((d) => d.value);
    const tree = treemap(root);
    const consoles = dataSet.children.map((item) => item.name);
    const color = d3.scaleOrdinal(d3.schemePaired);

    // SVG
    const svg = d3.select('#svg');

    // tiles

    const container = svg
      .selectAll('.tile')
      .data(tree.leaves())
      .enter()
      .append('g')
      .attr('class', styles.tileContainer)
      .attr('transform', (d) => {
        return `translate(${d.x0},${d.y0} )`;
      });

    container
      .append('rect')
      .attr('class', styles.tile)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .style('fill', (d) => color(d.data.category))
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      // hover
      .on('mouseenter', (e, d) => {
        const { name, category, value } = d.data;
        tag.setAttribute('data-value', value);
        tag.classList.add(styles.visible);
        tag.innerHTML = ` <p>Name: ${name} </p> <p>Category: ${category} </p> <p>Value: ${value} </p>`;
      })
      .on('mouseleave', (d, i) => {
        tag.classList.remove(styles.visible);
      });

    // handle tag placemant
    const tag = document.querySelector('#tag');
    document.addEventListener('mousemove', (d) => {
      tag.style.transform = 'translateY(' + (d.clientY - 0) + 'px)';
      tag.style.transform += 'translateX(' + (d.clientX - 0) + 'px)';
    });

    container
      .append('foreignObject')
      .text((d) => d.data.name)
      .attr('class', styles.label)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('width', (d) => d.x1 - d.x0);

    // legend

    const legend = svg
      .append('g')
      .attr('id', 'legend')
      .attr('class', styles.legend)
      .selectAll('.legend-key')
      .data(consoles)
      .enter()
      .append('g')
      .attr('class', styles.legendKey)
      .attr('transform', `translate(0,${h - legendHeight + padding})`);

    legend
      .append('rect')
      .attr('class', styles.legendItem)
      .attr('x', (d, i) => i * (w / consoles.length))
      .attr('width', w / consoles.length)
      .attr('height', legendHeight)
      .style('fill', (d) => color(d));

    legend
      .append('foreignObject')
      .text((d) => d)
      .attr('class', styles.keysText)
      .attr('x', (d, i) => i * (w / consoles.length))
      .attr('width', w / consoles.length)
      .attr('height', legendHeight)
      .attr('transform', `translate(0,${legendHeight / 4})`);
  };

  return (
    <div className={styles.body}>
      <h1 class={styles.title}>Video Game Sales</h1>
      <h3 class={styles.description}>
        Top 100 Most Sold Video Games Grouped by Platform
      </h3>
      <div className={styles.chart}>
        <svg width={w} height={h} id="svg"></svg>
      </div>
      <div
        id="tag"
        className={styles.tag}
        classList={styles.tooltip}
        data-value="0"
      ></div>
    </div>
  );
}

export default Treemap;
