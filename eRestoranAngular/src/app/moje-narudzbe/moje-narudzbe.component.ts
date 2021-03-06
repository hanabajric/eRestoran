import { Component, OnInit } from '@angular/core';
import {MojaNarudzba} from "./view-models/moja-narudzba-vm";
import {MyConfig} from "../my-config";
import {HttpClient} from "@angular/common/http";
import {MeniStavkaKorisnik} from "../meni/view-models/meni-korisnik-vm";

@Component({
  selector: 'app-moje-narudzbe',
  templateUrl: './moje-narudzbe.component.html',
  styleUrls: ['./moje-narudzbe.component.css']
})
export class MojeNarudzbeComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number;
  mojeNarudzbe : MojaNarudzba[] = null;
  obavjestenje : boolean = false;
  closeModal : boolean = false;
  obavjestenjeNaslov : string = "";
  obavjestenjeSadrzaj : string = "";

  constructor(private httpKlijent : HttpClient) { }

  ngOnInit(): void {
    this.ucitajNarudzbe();
  }

  private ucitajNarudzbe() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/GetAllPaged/" + this.currentPage,MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.totalPages = response.totalPages;
      this.mojeNarudzbe = response.dataItems;
    })
  }

  naruci(narudzba : MojaNarudzba) {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/Naruci/" + narudzba.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      narudzba.status = response.status;
      this.obavjestenje = true;
      this.closeModal = false;
      this.obavjestenjeNaslov = "Vaša narudžba je uspješno poslana";
      this.obavjestenjeSadrzaj = "Uspješno ste ponovo naručili odabranu narudžbu po cijeni od: " + narudzba.cijena + " KM";
    });
  }

  obrisi(narudzba : MojaNarudzba) {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/Delete/" + narudzba.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.obavjestenje = true;
      this.closeModal = false;
      this.obavjestenjeNaslov = "Vaša narudžba je uspješno obrisana";
      this.obavjestenjeSadrzaj = "Uspješno ste obrisali odabranu narudžbu";
      this.ucitajNarudzbe();
    });
  }

  animirajObavjestenje() {
    return this.closeModal == true? 'animate__animated animate__bounceOut' : 'animate__animated animate__bounceIn';
  }

  zatvoriModalObavjestenje(){
    this.closeModal = true;
    this.animirajObavjestenje();
    setTimeout(() => {
      this.obavjestenje = false;
    },1000);
  }

  createRangeStranica() {
    var niz = new Array(this.totalPages);
    for(let i : number = 0; i < this.totalPages; i++){
      niz[i] = i + 1;
    }
    return niz;
  }

  ucitajStranicu(page : number) {
    this.currentPage = page;
    this.ucitajNarudzbe();
  }

  dodajUOmiljene(id : number) {
    this.httpKlijent.get(MyConfig.adresaServera + "/Narudzba/OmiljenaNarudzba/" + id, MyConfig.httpOpcije()).subscribe((response : any) => {
      this.obavjestenje = true;
      this.closeModal = false;
      this.obavjestenjeNaslov = "Narudžba premještena u sekciju omiljenih narudžbi";
      this.obavjestenjeSadrzaj = "Uspješno ste lajkali Vašu narudžbu";
      this.ucitajNarudzbe();
    })
  }
}
