import { Component, OnInit } from '@angular/core';
import {Korisnik} from "./view-models/korisnik-vm";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {Opstina} from "../registracija/view-models/opstina-vm";
import {AutentifikacijaHelper} from "../helper/autentifikacija-helper";
import {LoginInformacije} from "../helper/login-informacije";
import {Router} from "@angular/router";

@Component({
  selector: 'app-moji-podaci',
  templateUrl: './moji-podaci.component.html',
  styleUrls: ['./moji-podaci.component.css']
})
export class MojiPodaciComponent implements OnInit {
  loginInformacije : LoginInformacije = null;
  korisnik : Korisnik = new Korisnik();
  opstine : Opstina[] = null;
  fieldText: boolean;
  obavjestenje : boolean = false;
  closeModal : boolean = false;
  obavjestenjeNaslov : string = "";
  obavjestenjeSadrzaj : string = "";
  obrisiProfilObavjestenje : boolean = false;
  uspjesnoBrisanje : boolean = false;

  constructor(private httpKlijent : HttpClient, private router : Router) {
    this.loginInformacije = AutentifikacijaHelper.getLoginInfo();
  }

  ngOnInit(): void {
    if (this.loginInformacije.isPermisijaKorisnik) this.getOpstine();
    this.ucitajPodatke();
  }

  private ucitajPodatke() {
    this.httpKlijent.get(MyConfig.adresaServera + "/KorisnickiNalog/Get", MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.korisnik = response;
    });
  }

  private getOpstine() {
    this.httpKlijent.get( MyConfig.adresaServera + "/Opstina/GetAll").subscribe((response : any)=>{
      this.opstine = response;
    });
  }

  prikaziSakrij() {
    this.fieldText = !this.fieldText;
  }

  generisiPreview() {
    // @ts-ignore
    var file = document.getElementById("fajl-input").files[0];

    if (file){
      var reader = new FileReader();
      reader.onload = function (){
        document.getElementById("preview-slika").setAttribute("src", reader.result.toString());
      }
      reader.readAsDataURL(file);
    }
  }

  podesiSirinuCarda() {
    return (this.loginInformacije.isPermisijaZaposlenik || this.loginInformacije.isPermisijaDostavljac) ? 'col-xl-12' :'col-xl-6';
  }

  azurirajPodatkeKorisnik() {
    if (this.validirajFormu()){

      this.httpKlijent.post(MyConfig.adresaServera + "/Korisnik/Update",this.korisnik, MyConfig.httpOpcije()).subscribe((result :any)=>{

          this.obavjestenje = true;
          this.closeModal = false;
          this.obavjestenjeNaslov ="Ure??en profil";
          this.obavjestenjeSadrzaj=this.korisnik.ime+" "+this.korisnik.prezime+", uspje??no ste uredili svoje podatke profila";
        });

    }
    else this.prikaziObavjestenje("Neadekvatno ispunjena forma za promjenu li??nih podataka", "Molimo ispunite sva obavezna polja, pa ponovo poku??ajte");
  }

  animirajObavjestenje() {
    return this.closeModal == true? 'animate__animated animate__bounceOutUp' : 'animate__animated animate__bounceInDown';
  }

  zatvoriModalObavjestenje(){
    this.closeModal = true;
    this.animirajObavjestenje();
    setTimeout( () => {
      this.obavjestenje = false;
    },500);
    setTimeout( () => {
      this.obrisiProfilObavjestenje = false;
    },500);
  }

  private validirajFormu() {
    var osnovneInformacije : boolean = this.korisnik.korisnickoIme != null && this.korisnik.korisnickoIme?.length > 0
      && this.korisnik.lozinka != null && this.korisnik.lozinka?.length > 0
      && this.korisnik.ime != null && this.korisnik.ime?.length > 0
      && this.korisnik.prezime != null && this.korisnik.prezime?.length > 0
      && this.korisnik.email != null && this.korisnik.email?.length > 0;
    var dodatneInformacije : boolean = true;
    if (this.loginInformacije.isPermisijaKorisnik)
      dodatneInformacije = this.korisnik.adresaStanovanja != null && this.korisnik.adresaStanovanja?.length > 0
                          && this.korisnik.brojTelefona != null && this.korisnik.brojTelefona?.length > 0
                          && this.korisnik.opstinaId != null;
    if (this.loginInformacije.isPermisijaZaposlenik || this.loginInformacije.isPermisijaDostavljac)
      dodatneInformacije = document.getElementById('preview-slika').getAttribute("src").length > 0;
    return osnovneInformacije && dodatneInformacije;
  }

  private prikaziObavjestenje(naslov : string, sadrzaj : string) {
    this.obavjestenje = true;
    this.closeModal = false;
    this.obavjestenjeNaslov = naslov;
    this.obavjestenjeSadrzaj = sadrzaj;
  }

  provjeriPolje(polje: any) {
    if (polje.invalid && (polje.dirty || polje.touched)){
      if (polje.errors?.['required']){
        return 'Niste popunili ovo polje!';
      }
      else {
        return '';
      }
    }
    return 'Obavezno polje za unos';
  }

  obrisiProfil() {
      this.httpKlijent.get(MyConfig.adresaServera + "/Korisnik/Delete", MyConfig.httpOpcije()).subscribe((response: any) => {
        AutentifikacijaHelper.ocistiMemoriju();
        this.uspjesnoBrisanje = true;
        this.zatvoriModalObavjestenje();
        this.router.navigateByUrl("home-page");
      });
      if (!this.uspjesnoBrisanje){
        this.zatvoriModalObavjestenje();
        setTimeout(() => {
          this.obrisiProfilObavjestenje = false;
          this.prikaziObavjestenje("Obavje??tenje", "Trenutno ne mo??ete deaktivirati profil jer su Va??e narud??be u izradi");
        }, 1000);
      }
  }

  otvoriModal() {
    this.obrisiProfilObavjestenje = true;
    this.prikaziObavjestenje("Upozorenje!", "Da li ste sigurni da ??elite obrisati svoj profil?");
  }

  azurirajPodatkeZaposlenik() {
    if (this.validirajFormu()) {
      // @ts-ignore
      var file = document.getElementById("fajl-input").files[0];

      var data = new FormData();
      data.append("slikaZaposlenika", file);
      this.httpKlijent.post(MyConfig.adresaServera  + "/Zaposlenik/UpdatePostavkaProfila", this.korisnik, MyConfig.httpOpcije()).subscribe((result: any) => {
        this.httpKlijent.post(MyConfig.adresaServera  + "/Zaposlenik/UpdateSlika" ,data, MyConfig.httpOpcije()).subscribe((result: any)=>{
        this.obavjestenje = true;
        this.closeModal = false;
        this.obavjestenjeNaslov = "Ure??en profil";
        this.obavjestenjeSadrzaj = this.korisnik.ime + " " + this.korisnik.prezime + ", uspje??no ste uredili svoje podatke profila";
      });
      });
    }
    else this.prikaziObavjestenje("Neadekvatno ispunjena forma za promjenu li??nih podataka", "Molimo ispunite sva obavezna polja, pa ponovo poku??ajte");
  }

  azurirajPodatkeDostavljac() {
    if (this.validirajFormu()) {
      // @ts-ignore
      var file = document.getElementById("fajl-input").files[0];

      var data = new FormData();
      data.append("slikaDostavljaca", file);
      this.httpKlijent.post(MyConfig.adresaServera  + "/Dostavljac/UpdatePostavkaProfila", this.korisnik, MyConfig.httpOpcije()).subscribe((result: any) => {
        this.httpKlijent.post(MyConfig.adresaServera  + "/Dostavljac/UpdateSlika" ,data, MyConfig.httpOpcije()).subscribe((result: any)=>{
          this.obavjestenje = true;
          this.closeModal = false;
          this.obavjestenjeNaslov = "Ure??en profil";
          this.obavjestenjeSadrzaj = this.korisnik.ime + " " + this.korisnik.prezime + ", uspje??no ste uredili svoje podatke profila";
        });
      });
    }
    else this.prikaziObavjestenje("Neadekvatno ispunjena forma za promjenu li??nih podataka", "Molimo ispunite sva obavezna polja, pa ponovo poku??ajte");
  }

  azurirajPodatkeAdmin() {

    if (this.validirajFormu()){

      this.httpKlijent.post(MyConfig.adresaServera + "/KorisnickiNalog/UpdateAdmin",this.korisnik, MyConfig.httpOpcije()).
      subscribe((result :any)=>{
console.log(result);
        this.obavjestenje = true;
        this.closeModal = false;
        this.obavjestenjeNaslov ="Ure??en profil";
        this.obavjestenjeSadrzaj=this.korisnik.ime+" "+this.korisnik.prezime+", uspje??no ste uredili svoje podatke profila";
      });

    }
    else this.prikaziObavjestenje("Neadekvatno ispunjena forma za promjenu li??nih podataka", "Molimo ispunite sva obavezna polja, pa ponovo poku??ajte");
  }
}
