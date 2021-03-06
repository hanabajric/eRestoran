import {Component, OnDestroy, OnInit} from '@angular/core';
import {Poslovnica} from "../../home-page/view-models/poslovnica-vm";
import {Opstina} from "../../registracija/view-models/opstina-vm";
import {MyConfig} from "../../my-config";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-poslovnica',
  templateUrl: './edit-poslovnica.component.html',
  styleUrls: ['./edit-poslovnica.component.css']
})
export class EditPoslovnicaComponent implements OnInit, OnDestroy {
  id : number;
  private sub : any;
  poslovnica : Poslovnica = new Poslovnica();
  opstine: Opstina[] = null;
  obavjestenje : boolean = false;
  closeModal : boolean = false;
  obavjestenjeNaslov : string = "";
  obavjestenjeSadrzaj : string = "";
  azurirajPodatke: boolean = false;

  constructor(private httpKlijent : HttpClient, private activatedRoute : ActivatedRoute, private router : Router) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.inicijalizirajGoogleMapu();
    this.ucitajOpstine();
    this.ucitajPoslovnicu();
  }

  inicijalizirajGoogleMapu() {

    const map = new google.maps.Map(document.getElementById("map")!, {
      zoom: 17,
      center: { lat: 43.8559, lng: 18.40725 }, //koordinate Sarajeva
    });

    // Novi info window
    let infoWindow = new google.maps.InfoWindow({
      content: "Kliknite na lokaciju da učitate novu geografsku širinu i dužinu!",
      position: { lat: 43.8559, lng: 18.40725 },
    });

    infoWindow.open(map);

    // click listener
    map.addListener("click", (mapsMouseEvent : any) => {
      // zatvori trenutni info window
      infoWindow.close();

      // napravi novi info window
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      this.poslovnica.lat = mapsMouseEvent.latLng.toJSON().lat;
      this.poslovnica.lng = mapsMouseEvent.latLng.toJSON().lng;
      infoWindow.open(map);
    });
  }

  private ucitajOpstine() {
    this.httpKlijent.get( MyConfig.adresaServera + "/Opstina/GetAll").subscribe((result:any)=>{
      this.opstine = result;
    });
  }

  animirajObavjestenje() {
    return this.closeModal == true? 'animate__animated animate__bounceOut' : 'animate__animated animate__bounceIn';
  }

  zatvoriModalObavjestenje(){
    this.closeModal = true;
    this.animirajObavjestenje();
    this.obavjestenje = setTimeout(function (){
      return false;
    },500)== 0? false : true;
    if (this.azurirajPodatke) {
      this.azurirajPodatke = setTimeout(function () {
        return false;
      }, 500) == 0 ? false : true;
    }
  }

  private prikaziObavjestenje(naslov : string, sadrzaj : string) {
    this.obavjestenje = true;
    this.closeModal = false;
    this.obavjestenjeNaslov = naslov;
    this.obavjestenjeSadrzaj = sadrzaj;
  }

  azuriraj() {
    if (this.validirajFormu()) {
      this.httpKlijent.post(MyConfig.adresaServera + "/Poslovnica/Update", this.poslovnica, MyConfig.httpOpcije()).subscribe((response: any) => {
        this.azurirajPodatke = true;
        this.prikaziObavjestenje("Uspješno poslati podaci", "Uspješno ste uredili podatke o odabranoj poslovnici!");
      })
    }
    else{
      this.azurirajPodatke = false;
      this.prikaziObavjestenje("Neadekvatno ispunjena forma za uređivanje poslovnice", "Molimo ispunite sva obavezna polja, pa ponovo pokušajte");
    }
  }

  private ucitajPoslovnicu() {
    this.httpKlijent.get(MyConfig.adresaServera + "/Poslovnica/GetById/" + this.id, MyConfig.httpOpcije()).subscribe((response : any)=>{
      this.poslovnica = response;
    })
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

  private validirajFormu() {
    return this.poslovnica.adresa != null && this.poslovnica.adresa?.length > 0
      && this.poslovnica.brojTelefona != null && this.poslovnica.brojTelefona?.length > 0
      && this.poslovnica.radnoVrijemeRedovno != null && this.poslovnica.radnoVrijemeRedovno?.length > 0
      && this.poslovnica.radnoVrijemeVikend != null && this.poslovnica.radnoVrijemeVikend?.length > 0
      && this.poslovnica.lat != null && this.poslovnica.lng != null
      && this.poslovnica.opstinaId != -1;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigirajDoPoslovnica() {
    this.router.navigate(['/home-page']);
    setTimeout(()=>{
      this.router.navigate(['/home-page'], {fragment:'kontakt'});
    },1000);
  }
}
