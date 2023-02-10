import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checkpointAngular';
  personnages : any;
  citationPerso : any;
  persoTof : any;


  constructor(){
    this.recupCitations();
  }



 async recupCitations(){

let tab = [];

for(let i =0; i < 6; i++){
  let reponse = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
  let data = await reponse.json();
  tab.push(data);
}

console.log(tab);

 // récupération des personnages


 let persos = tab.map((quote : any) => quote[0].character);


 // récupération des photos des perso

 let photos = tab.map((quote : any) => quote[0].image);


 // filtrage du tableau pour ne laisser qu'une occurence de chaque perso

 let persoFilter = persos.filter((charac : any, index : any) => persos.indexOf(charac) === index );


let imageFilter = photos.filter((charac : any, index : any) => photos.indexOf(charac) === index );

 // recuperation des personnages pour les utiliser dans le HTML
 this.personnages = persoFilter;
 this.persoTof = imageFilter;
}

async recupCitationPerso(perso : any){
  let reponse = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${perso}`);
  let data = await reponse.json();

  console.log(data[0].quote);
  //récupération de la citation perso pour l'afficher dans le HTML si besoin
  this.citationPerso = data;


    }
}
