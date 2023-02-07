import styles from './styles/Scatterplot.module.css';
import React from 'react';
import * as d3 from 'd3';
// redux
import { useSelector } from 'react-redux';

function Scatterplot() {
  // redux
  const isMobile = useSelector((state) => state.isMobile.value);

  let w = 850;
  let h = 650;
  let padding = 63;
  if (isMobile) {
    w = w * 0.6;
    h = h * 0.6;
    padding = padding * 0.6;
  }
  // fetch data
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.forEach((d) => {
        let parsedTime = d.Time.split(':');
        d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
      });

      chart(data);
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
    const years = dataSet.map((i) => i.Year);
    const ScaleX = d3
      .scaleLinear()
      .domain([d3.min(years) - 1, d3.max(years) + 1])
      .range([padding, w - padding]);
    // y
    const time = d3.extent(dataSet, (d) => d.Time);
    const ScaleY = d3
      .scaleTime()
      .domain(time)
      .range([padding, h - padding]);
    // set axis

    const axisX = d3.axisBottom(ScaleX).tickFormat(d3.format('d'));
    const axisY = d3.axisLeft(ScaleY).tickFormat(d3.timeFormat('%M:%S'));

    // Add the svg
    const svg = d3.select('#svg');

    // Add dots
    svg
      .selectAll('.dot')
      .data(dataSet)
      .enter()
      .append('circle')
      .attr('class', styles.dot)
      .attr('r', 10)
      .attr('cx', (d) => ScaleX(d.Year))
      .attr('cy', (d, i) => ScaleY(d.Time))
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => d.Time)
      .style('stroke', 'black')
      .style('fill', (d) => {
        if (!d.Doping) {
          return '#eca869';
        }
      })
      .on('mouseenter', (d, i) => {
        tag.setAttribute('data-year', i.Year);
        tag.classList.add(styles.visible);
        tag.innerHTML = ` <h3>${i.Name} - ${i.Nationality}</h3> <h4>Year : ${
          i.Year
        }</h4>
      <h4>Time : ${i.Time.getMinutes()}:${i.Time.getSeconds()}
      </h4>
      <p> ${i.Doping}</p>`;
      })
      .on('mouseleave', (d, i) => {
        tag.classList.remove(styles.visible);
      });

    // legend
    const legend = svg
      .append('g')
      .attr('id', 'legend')
      .attr('class', styles.legend);
    legend
      .append('circle')
      .attr('r', 10)
      .attr('cx', w - padding * 3.8)
      .attr('cy', padding / 2.5)
      .style('fill', '#b08bbb');
    legend
      .append('text')
      .text('Riders with doping allegations')
      .attr('x', w - padding * 3.5)
      .attr('y', padding / 2);
    legend
      .append('circle')
      .attr('r', 10)
      .attr('cx', w - padding * 3.8)
      .attr('cy', padding / 1.1)
      .style('fill', '#eca869');
    legend
      .append('text')
      .text('No doping allegations')
      .attr('x', w - padding * 3.5)
      .attr('y', padding / 1);

    //  append axis rollers
    svg
      .append('g')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .attr('id', 'x-axis')
      .attr('class', styles.xAxis)
      .call(axisX);
    svg
      .append('g')
      .attr('transform', 'translate(' + padding + ',0 )')
      .attr('class', styles.yAxis)
      .call(axisY);
  };

  // handle tag placemant
  const tag = document.querySelector('.tag');
  document.addEventListener('mousemove', (d) => {
    tag.style.transform = 'translateY(' + (d.clientY - 0) + 'px)';
    tag.style.transform += 'translateX(' + (d.clientX - 0) + 'px)';
  });

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Doping in Professional Bicycle Racing</h1>
      <div className={styles.chart}>
        <svg width={w} height={h} id="svg"></svg>
      </div>
      <div
        id="tag"
        className={styles.tag}
        classList={styles.tooltip}
        data-year="0"
      ></div>
    </div>
  );
}

export default Scatterplot;
