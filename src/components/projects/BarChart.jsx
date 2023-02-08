import styles from './styles/BarChart.module.css';
import React from 'react';
import * as d3 from 'd3';

// redux
import { useSelector } from 'react-redux';

function BarChart() {
  // redux
  const isMobile = useSelector((state) => state.isMobile.value);

  // set size
  let w = 900;
  let h = 500;
  let padding = 50;
  if (isMobile) {
    w = w * 0.6;
    h = h * 0.6;
    padding = padding * 0.6;
  }
  // fetch data
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const dataSet = data.data;
      chart(dataSet);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getData();

  // SET CHART
  // create chart
  const chart = (dataSet) => {
    // set scale
    // x
    const xScale = d3
      .scaleTime()
      .domain([new Date(d3.min(dataSet)[0]), new Date(d3.max(dataSet)[0])])
      .range([padding, w - padding]);
    // y
    const yScale = d3
      .scaleLinear()
      .domain([d3.max(dataSet.map((i) => i[1])), 0])
      .range([padding, h - padding]);
    // set axis
    const axisX = d3.axisBottom(xScale);
    const axisY = d3.axisLeft(yScale);

    // select the chart
    const svg = d3.select('#svg');

    svg
      .selectAll('rect')
      .data(dataSet)
      .enter()
      .append('rect')
      .attr('data-date', (i) => i[0])
      .attr('data-gdp', (i) => i[1])
      .attr('x', (d, i) => {
        return (
          i * (w / dataSet.length - (padding * 2) / dataSet.length) +
          padding +
          1
        );
      })
      .attr('y', (d, i) => yScale(d[1]))
      .attr('width', (d) => w / dataSet.length - 1)
      .attr('height', (d, i) => h - yScale(d[1]) - padding)
      .attr('class', styles.bar)
      .attr('id', 'bar');

    // handle hover event
    const bars = document.querySelectorAll('#bar');
    const tag = document.querySelector('#tag');
    console.log(tag);
    bars.forEach((i) => {
      i.addEventListener('mouseenter', () => {
        let amount = '$' + i.__data__[1] + ' Bilion';
        let year = i.__data__[0].slice(0, 4);
        tag.classList.add(styles.visible);
        tag.innerHTML = ` <h3>${year}</h3> <h4>${amount}</h4>`;
        tag.setAttribute('data-date', i.__data__[0]);
      });
      i.addEventListener('mouseleave', () => {
        tag.classList.remove(styles.visible);
      });
    });

    document.addEventListener('mousemove', (d) => {
      tag.style.transform = 'translateY(' + (d.clientY - 80) + 'px)';
      tag.style.transform += 'translateX(' + (d.clientX - 100) + 'px)';
    });

    svg
      .append('text')
      .text('Gross Domestic Product')
      .attr('class', styles.label)
      .attr('x', h / 6)
      .attr('y', -padding * 1.5);
    // .attr('transform', 'rotate(180deg)');

    //  append axis rollers
    svg
      .append('g')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .attr('class', styles.xAxis)
      .call(axisX);
    svg
      .append('g')
      .attr('transform', 'translate(' + padding + ',0 )')
      .attr('class', styles.yAxis)

      .call(axisY);
  };

  return (
    <div className={styles.body}>
      <h1 class={styles.title}>United States GDP</h1>
      <div className={styles.chart}>
        <svg width={w} height={h} id="svg"></svg>
      </div>
      <div
        id="tag"
        className={styles.tag}
        classList={styles.tooltip}
        data-date="0"
      ></div>
    </div>
  );
}

export default BarChart;
