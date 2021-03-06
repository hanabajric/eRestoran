using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.ModulRezervacija.ViewModels
{
    public class RezervacijaGetAllVM
    {
        public int id { get; set; }
        public DateTime datumRezerviranja { get; set; }
        public string datumRezerviranjaPomocni { get; set; }
        public int brojOsoba { get; set; }
        public int brojStolova { get; set; }
        public string poruka { get; set; }
        public int prigodaID { get; set; }
        public string nazivPrigode { get; set; }
        public int statusID { get; set; }
        public string nazivStatusa { get; set; }

    }
}
