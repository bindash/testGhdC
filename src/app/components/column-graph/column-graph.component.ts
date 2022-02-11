import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-column-graph',
  templateUrl: './column-graph.component.html',
  styleUrls: ['./column-graph.component.scss']
})
export class ColumnGraphComponent implements OnInit {
  
  @Input() patientUn!: any
  @Input() patientDeux!: any
  @Input() patientTrois!: any
  @Input() patientQuatre!: any

  //Input pour récupérer les données du parent (IndexComponent)
  data: any = {
    "Patient": [
        ["Patient 1", this.patientUn],
        ["Patient 2", this.patientDeux],
        ["Patient 3", this.patientTrois],
        ["Patient 4", this.patientQuatre]
    ]
  };

  public options: any = {
    chart: {type: 'column'},
    title: {text: "Représentation visuelle de données de patients"},
    credits: {enabled: false},
    legend: {enabled: false},
    yAxis: {title: {text: ""}},
    xAxis: {visible: false},
    series: []
  }

  constructor() { }

  changeSeries() {
    Highcharts.chart('container', this.options).addSeries({
      name: "Patient",
      data: [this.patientUn, this.patientDeux, this.patientTrois, this.patientQuatre],
      color: "#0000FF",
      type: 'column'}, true)
  }

  ngOnInit() { 
    Highcharts.chart('container', this.options)
  }
}
