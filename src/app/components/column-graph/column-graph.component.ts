import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-graph',
  templateUrl: './column-graph.component.html',
  styleUrls: ['./column-graph.component.scss']
})
export class ColumnGraphComponent implements OnInit {

  btn: any

  dataPrev: any = {
    2016: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 11],
        ['Russia', 24],
        ['China', 38],
        ['Great Britain', 29],
        ['United States', 46]
    ],
    2012: [
        ['South Korea', 13],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 0],
        ['Russia', 22],
        ['China', 51],
        ['Great Britain', 19],
        ['United States', 36]
    ],
    2008: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 13],
        ['Russia', 27],
        ['China', 32],
        ['Great Britain', 9],
        ['United States', 37]
    ],
    2004: [
        ['South Korea', 0],
        ['Japan', 5],
        ['Australia', 16],
        ['Germany', 0],
        ['Russia', 32],
        ['China', 28],
        ['Great Britain', 0],
        ['United States', 36]
    ],
    2000: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 9],
        ['Germany', 20],
        ['Russia', 26],
        ['China', 16],
        ['Great Britain', 0],
        ['United States', 44]
    ]
};

  data: any = {
    2016: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 17],
        ['Russia', 19],
        ['China', 26],
        ['Great Britain', 27],
        ['United States', 46]
    ],
    2012: [
        ['South Korea', 13],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 0],
        ['Russia', 24],
        ['China', 38],
        ['Great Britain', 29],
        ['United States', 46]
    ],
    2008: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 0],
        ['Germany', 16],
        ['Russia', 22],
        ['China', 51],
        ['Great Britain', 19],
        ['United States', 36]
    ],
    2004: [
        ['South Korea', 0],
        ['Japan', 16],
        ['Australia', 17],
        ['Germany', 0],
        ['Russia', 27],
        ['China', 32],
        ['Great Britain', 0],
        ['United States', 37]
    ],
    2000: [
        ['South Korea', 0],
        ['Japan', 0],
        ['Australia', 16],
        ['Germany', 13],
        ['Russia', 32],
        ['China', 28],
        ['Great Britain', 0],
        ['United States', 36]
    ]
};

  countries: any = [{
    name: 'South Korea',
    color: 'rgb(201, 36, 39)'
}, {
    name: 'Japan',
    color: 'rgb(201, 36, 39)'
}, {
    name: 'Australia',
    color: 'rgb(0, 82, 180)'
}, {
    name: 'Germany',
    color: 'rgb(0, 0, 0)'
}, {
    name: 'Russia',
    color: 'rgb(240, 240, 240)'
}, {
    name: 'China',
    color: 'rgb(255, 217, 68)'
}, {
    name: 'Great Britain',
    color: 'rgb(0, 82, 180)'
}, {
    name: 'United States',
    color: 'rgb(215, 0, 38)'
}];
  value: any;
  output: any;


  getData(data: any) {
    return data.map( (country: any, i: number) => {
        return {
            name: country[0],
            y: country[1],
            color: this.countries[i].color
        };
    });
}

  options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Summer Olympics 2016 - Top 5 countries by Gold medals',
        align: 'left'
    },
    subtitle: {
        text: 'Comparing to results from Summer Olympics 2012 - Source: <a href="https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table">Wikipedia</a>',
        align: 'left'
    },
    plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} medals</b><br/>'
    },
    xAxis: {
        type: 'category',
        max: 4,
        labels: {
            useHTML: true,
            animate: true,
            formatter: (value: any) => {
                    value = this.value,
                    this.output;

                this.countries.forEach( (country: any) => {
                    if (country.name === value) {
                        this.output = country.flag;
                    }
                });

            }
        }
    },
    yAxis: [{
        title: {
            text: 'Gold medals'
        },
        showFirstLabel: false
    }],
    series: [{
        color: 'rgb(158, 159, 163)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: this.dataPrev[2016].slice(),
        name: '2012'
    }, {
        name: '2016',
        id: 'main',
        dataSorting: {
            enabled: true,
            matchByName: true
        },
        dataLabels: [{
            enabled: true,
            inside: true,
            style: {
                fontSize: '16px'
            }
        }],
        data: this.getData(this.data[2016]).slice()
    }],
    exporting: {
        allowHTML: true
    }
};

  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }

}
