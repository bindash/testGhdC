import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { ColumnGraphComponent } from '../column-graph/column-graph.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //Récupération du composant contenant le graphique pour interagir directement avec ce dernier
  @ViewChild(ColumnGraphComponent) graphComponent: ColumnGraphComponent

  //Données à transmettre au graphique
  donnees!: any
  donneesDeux!: any
  donneesTrois!: any
  donneesQuatre!: any

  //Date actuelle (servira à calculer l'âge d'un patient en fonction de sa date de naissance)
  dateActuelle!: Date
  //Chaîne de caractères représentant le type de données sélectionné
  typeDonneeSelectionne!: string

  //Tableau de patients utilisé plus tard dans la fonction subscribe()
  peoples!: Patient[]

  //Type de données à choisir dans un ng-select
  typeDonnees = ["Âge", "Consommation tabagique", "IMC", "Cholestérol HDL", "Cholestérol Total", "HbA1c", "PSS"]

  //Variable booléenne décidant de l'activation des ng-select des patients
  disablePatients!: boolean

  //Injection du service de patients dans le constructeur
  constructor(private _patientService: PatientService) { 
    //Désactivation des ng-select des patients (activation lors de la détection d'un changement dans le ng-select concerné)
    this.disablePatients = true
    //Initialisation de graphComponent
    this.graphComponent = new ColumnGraphComponent()
    //Initialisation de la date actuelle
    this.dateActuelle = new Date()
  }
  
  ngOnInit(): void {
    //Obtenir tous les patients
    this._patientService.getAll().subscribe(
      data => {
        //Récupérer tous les patients et les mettre dans un tableau de patients
        this.peoples = data
        //Mapping permettant le fonctionnement correct de la recherche dans les ng-select
        this.peoples.map(p => {
          p.nomPrenom = `${p.admin.prenom} ${p.admin.nom}`
          p.biometrie.bmi = (p.biometrie.poids / Math.pow(p.biometrie.taille, 2)) * 10000
          p.admin.age = Number(this.dateActuelle.getFullYear()) - Number(p.admin['date_de _naissance'].substring(0, 4))
        })
      },
      //Dans le cas d'une erreur...
      error => {
        console.log("Erreur lors du mapping prénom + nom : " + error);
      }
    )
  }
  
  //Fonction pour obtenir un patient via son ID
  getPatientById(item: any): void {
    //Si l'objet récupéré est trouvé...
    if (item != undefined)
    {
      //Récupérer le patient par l'ID de l'objet récupéré
      this._patientService.getById(item.id).subscribe(p => {
        this.sendDataToGraph(p)
      })
    }
  }
  getPatientByIdDeux(item: any): void {
    //Si l'objet récupéré est trouvé...
    if (item != undefined)
    {
      //Récupérer le patient par l'ID de l'objet récupéré
      this._patientService.getById(item.id).subscribe(p => {
        this.sendDataToGraphDeux(p)
      })
    }
  }
  getPatientByIdTrois(item: any): void {
    //Si l'objet récupéré est trouvé...
    if (item != undefined)
    {
      //Récupérer le patient par l'ID de l'objet récupéré
      this._patientService.getById(item.id).subscribe(p => {
        this.sendDataToGraphTrois(p)
      })
    }
  }
  getPatientByIdQuatre(item: any): void {
    //Si l'objet récupéré est trouvé...
    if (item != undefined)
    {
      //Récupérer le patient par l'ID de l'objet récupéré
      this._patientService.getById(item.id).subscribe(p => {
        this.sendDataToGraphQuatre(p)
      })
    }
  }

  //Fonction pour activer les ng-select des patients une fois que l'on a choisi un type de données à afficher
  enablePatients(item: any): void {
    //Si l'object récupéré n'est pas vide...
    if (item != undefined)
    {
      //...On attribue sa valeur à la variable "typeDonneeSelectionne" via une méthode...
      this.setTypeSelectionne(item)
      //...et on désactive les les ng-select des patients.
      this.disablePatients = false
    }

  }

  //Fonction de modification du titre de l'axe vertical
  setTitreAxeY() {
    switch(this.typeDonneeSelectionne)
    {
      case "Âge": this.graphComponent.options.yAxis = {title: {text : "Âge"}};break;
      case "Consommation tabagique": this.graphComponent.options.yAxis = {title: {text : "Consommation tabagique (nb paquets/année)"}};break;
      case "IMC": this.graphComponent.options.yAxis = {title: {text : "IMC"}};break;
      case "Cholestérol HDL": this.graphComponent.options.yAxis = {title: {text : "Cholestérol HDL (mg/dl)"}};break;
      case "Cholestérol Total": this.graphComponent.options.yAxis = {title: {text : "Cholestérol Total (mg/dl)"}};break;
      case "HbA1c": this.graphComponent.options.yAxis = {title: {text : "HbA1c (ratio)"}};break;
      case "PSS": this.graphComponent.options.yAxis = {title: {text : "Pression sanguine systolique (mmHg)"}};break;
      default: console.log("Erreur détectée !");break;
    }
  }

  //Fonction d'attribution de valeur à "typeDonneeSelectionnee"
  setTypeSelectionne(item: any) {
    this.typeDonneeSelectionne = item
  }

  //Fonction d'envoi des données au graphique
  sendDataToGraph(patient: Patient): void {
    switch(this.typeDonneeSelectionne)
    {
      case "Âge": this.donnees = this.peoples[patient.id - 1].admin.age;break;
      case "Consommation tabagique": this.donnees = patient.assuetudes.Consommation_tabagique;break;
      case "IMC": this.donnees = this.peoples[patient.id - 1].biometrie.bmi;break;
      case "Cholestérol HDL": this.donnees = patient.const_biologique.Cholesterol_HDL;break;
      case "Cholestérol Total": this.donnees = patient.const_biologique.Cholesterol_total;break;
      case "HbA1c": this.donnees = patient.const_biologique.HbA1c;break;
      case "PSS": this.donnees = patient.parametres.PSS;break;
      default: console.log("Erreur détectée !");break;
    }
  }
  sendDataToGraphDeux(patient: Patient): void {

    switch(this.typeDonneeSelectionne)
    {
      case "Âge": this.donneesDeux = this.peoples[patient.id - 1].admin.age;break;
      case "Consommation tabagique": this.donneesDeux = patient.assuetudes.Consommation_tabagique;break;
      case "IMC": this.donneesDeux = this.peoples[patient.id - 1].biometrie.bmi;break;
      case "Cholestérol HDL": this.donneesDeux = patient.const_biologique.Cholesterol_HDL;break;
      case "Cholestérol Total": this.donneesDeux = patient.const_biologique.Cholesterol_total;break;
      case "HbA1c": this.donneesDeux = patient.const_biologique.HbA1c;break;
      case "PSS": this.donneesDeux = patient.parametres.PSS;break;
      default: console.log("Erreur détectée !");break;
    }
  }
  sendDataToGraphTrois(patient: Patient): void {

    switch(this.typeDonneeSelectionne)
    {
      case "Âge": this.donneesTrois = this.peoples[patient.id - 1].admin.age;break;
      case "Consommation tabagique": this.donneesTrois = patient.assuetudes.Consommation_tabagique;break;
      case "IMC": this.donneesTrois = this.peoples[patient.id - 1].biometrie.bmi;break;
      case "Cholestérol HDL": this.donneesTrois = patient.const_biologique.Cholesterol_HDL;break;
      case "Cholestérol Total": this.donneesTrois = patient.const_biologique.Cholesterol_total;break;
      case "HbA1c": this.donneesTrois = patient.const_biologique.HbA1c;break;
      case "PSS": this.donneesTrois = patient.parametres.PSS;break;
      default: console.log("Erreur détectée !");break;
    }
  }
  sendDataToGraphQuatre(patient: Patient): void {

    switch(this.typeDonneeSelectionne)
    {
      case "Âge": this.donneesQuatre = this.peoples[patient.id - 1].admin.age;break;
      case "Consommation tabagique": this.donneesQuatre = patient.assuetudes.Consommation_tabagique;break;
      case "IMC": this.donneesQuatre = this.peoples[patient.id - 1].biometrie.bmi;break;
      case "Cholestérol HDL": this.donneesQuatre = patient.const_biologique.Cholesterol_HDL;break;
      case "Cholestérol Total": this.donneesQuatre = patient.const_biologique.Cholesterol_total;break;
      case "HbA1c": this.donneesQuatre = patient.const_biologique.HbA1c;break;
      case "PSS": this.donneesQuatre = patient.parametres.PSS;break;
      default: console.log("Erreur détectée !");break;
    }
  }
}
