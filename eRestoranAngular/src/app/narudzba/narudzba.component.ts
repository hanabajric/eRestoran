import { Component, OnInit } from '@angular/core';
import {Narudzba} from "./view-models/narudzba-vm";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {StavkaNarudzbe} from "./view-models/stavka-narudzbe-vm";
import {NarudzbaStavka} from "./view-models/narudzba-stavka";
import {NovaKolicina} from "./view-models/update-kolicina-vm";
import {Kupon} from "./view-models/kupon-vm";

@Component({
  selector: 'app-narudzba',
  templateUrl: './narudzba.component.html',
  styleUrls: ['./narudzba.component.css']
})
export class NarudzbaComponent implements OnInit {
  narudzba : Narudzba = null;
  podaci : StavkaNarudzbe = new StavkaNarudzbe();
  updateKolicina : NovaKolicina = new NovaKolicina();
  kuponi : Kupon[] = null;
  odabraniKupon : Kupon = new Kupon();
  zakljuciNarudzbu : boolean = false;
  closeModal : boolean = false;
  closeModalObavjestenje : boolean = false;
  obavjestenje : boolean = false;
  obavjestenjeMessage : string = "";

  constructor(private httpKlijent : HttpClient) {
  }

  ngOnInit(): void {
    this.ucitajNarudzbu();
    this.ucitajKupone();
  }

  private ucitajNarudzbu() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/GetNarudzba", MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.narudzba = response;
    });
  }

  ukloni(stavka : NarudzbaStavka) {
    this.httpKlijent.get(MyConfig.adresaServera+"/Narudzba/UkloniStavku/" + stavka.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.narudzba = response;
      this.ucitajBrojStavki();
    });
  }

  private ucitajBrojStavki() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/GetBrojStavki", MyConfig.httpOpcije()).subscribe((response : any) => {
      document.getElementById('kolicina').innerHTML = response;
    });
  }

  public novaKolicina(stavka : NarudzbaStavka){
     this.updateKolicina.id = stavka.id;
     this.updateKolicina.kolicina = stavka.kolicina;
    this.httpKlijent.post(MyConfig.adresaServera + "/Narudzba/UpdateKolicina", this.updateKolicina, MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.narudzba.cijena = response.cijena;
      document.getElementById('kolicina').innerHTML = response.kolicina;
    });
  }

  upravljajOmiljenomNarudzbom(narudzba: Narudzba) {
    if (narudzba.omiljeno){
      narudzba.omiljeno = false;
      this.ukloniOmiljeno(narudzba);
    }
    else {
      narudzba.omiljeno = true;
      this.dodajOmiljeno(narudzba);
    }
  }

  private ukloniOmiljeno(narudzba: Narudzba) {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/UkloniOmiljenu/" + narudzba.id, MyConfig.httpOpcije()).subscribe((response : any)=>{

    });
  }

  private dodajOmiljeno(narudzba: Narudzba){
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/OmiljenaNarudzba/" + narudzba.id, MyConfig.httpOpcije()).subscribe((response : any)=>{

    });
  }

  private ucitajKupone() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Kupon/GetAll", MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.kuponi = response;
    })
  }

  zatvoriModal() {
    this.odabraniKupon.id = 0;
    this.closeModal = true;
    this.animiraj();
    setTimeout(() => {
      this.zakljuciNarudzbu = false;
    },1000);
  }

  posaljiKupon() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Kupon/PrimijeniKupon/" + this.odabraniKupon.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      document.getElementById("cijenaPopust").innerHTML = "Cijena narud??be sa popustom iznosi: " + response + " KM";
    })
  }

  posaljiNarudzbu() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/Zakljuci/" + this.odabraniKupon.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      if (this.odabraniKupon.id != 0){
        this.httpKlijent.get(MyConfig.adresaServera + "/Kupon/GetBrojKupona", MyConfig.httpOpcije()).subscribe((result : any)=>{
          document.getElementById("notifikacije").innerHTML  = result;
        });
      }
      this.zatvoriModal();
      this.obavjestenjeMessage = "Cijena Va??e narud??be iznosi: " + response + " KM";
      this.obavjestenje = true;
      this.ucitajNarudzbu();
      document.getElementById('kolicina').innerHTML = "0";
    })
  }

  animiraj() {
    return this.closeModal == true? 'animate__animated animate__backOutUp' : 'animate__animated animate__backInDown';
  }

  animirajObavjestenje() {
    return this.closeModalObavjestenje == true? 'animate__animated animate__backOutUp' : 'animate__animated animate__backInDown';
  }

  zatvoriModalObavjestenje(){
    this.closeModalObavjestenje = true;
    this.animiraj();
    setTimeout(() => {
      this.obavjestenje = false;
    },1000);
    this.obavjestenjeMessage = "";
  }
}
