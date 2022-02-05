import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;


@Component({
  selector: 'app-test-graph',
  templateUrl: './test-graph.component.html',
  styleUrls: ['./test-graph.component.scss']
})
export class TestGraphComponent implements OnInit {
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Evolution de la population'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
    series: [{
      name: 'Asie',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'Amerique',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }]
  }

  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }

}