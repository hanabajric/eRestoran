import {Stavka} from "./stavka-vm";

export class OmiljenaNarudzba {
  id: number;
  cijena: number;
  datumNarucivanja: string;
  status: string;
  isKoristenKupon : boolean;
  stavke: Stavka[];
}
