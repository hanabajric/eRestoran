using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.ModulMeni.ViewModels
{
    public class PosebnaPonudaGetAllVM
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public string opis { get; set; }
        public float standardnaCijena { get; set; }
        public float snizenaCijena { get; set; }
        public string slika { get; set; }
        public float ocjena { get; set; }
        public string meniGrupaNaziv { get; set; }
    }
}
