import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //Tableau de patients utilisé plus tard dans la fonction subscribe()
  peoples!: Patient[]

  //Injection du service de patients dans le constructeur
  constructor(private _patientService: PatientService) { }

  ngOnInit(): void {
    //Obtenir tous les patients
    this._patientService.getAll().subscribe(
      data => {
        //Récupérer tous les patients et les mettre dans un tableau de patients
        this.peoples = data
        //Mapping permettant le fonctionnement correct de la recherche dans les ng-select
        this.peoples.map(p => {
          p.nomPrenom = `${p.admin.prenom} ${p.admin.nom}`
        })
      },
      //Dans le cas d'une erreur...
      error => {
        console.log("Erreur lors du mapping prénom + nom : " + error);
      }
    )
  }

}
