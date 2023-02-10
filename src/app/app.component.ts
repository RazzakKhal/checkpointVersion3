import { Component } from '@angular/core';
import { Quote } from './quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checkpointAngular';
 chargement : boolean = true;
  Filterquotes : Array<Quote> = [];


  constructor(){
    this.recupCitations();
  }



 async recupCitations(){

let tab : Array<[]>= [];

for(let i =0; i < 6; i++){
  let reponse = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
  let data = await reponse.json();
  tab.push(data);
}

//fin du chargement

this.chargement = false;


 // récupération des personnages

 let quotes : Array<Quote> = tab.map((quote : any) => quote[0]);


 // filtrage du tableau pour ne laisser qu'une occurence de chaque perso

let quotesFilter : Array<Quote> = [];


// je boucle autant de fois que j'ai de citations
for(let i = 0; i < quotes.length; i++){
// je récupère les noms des characters présents dans mon quotesFilter
let arrayName : Array<string> = [];
quotesFilter.forEach((item) => { arrayName.push(item.character) });

if(arrayName.includes(quotes[i].character)){

}else{
  quotesFilter.push(quotes[i]);
}


}


// récupération du tableau de citation pour afficher image et nom en HTML
this.Filterquotes = quotesFilter;

}

async recupCitationPerso(quote : Quote){
  let reponse = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${quote.character}`);
  let data = await reponse.json();

  console.log(data[0].quote);



    }
}
