// <auto-generated />
using System;
using FIT_Api_Examples.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FIT_Api_Examples.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20211210181300_NovaTabela")]
    partial class NovaTabela
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FIT_Api_Examples.ModulAutentifikacija.Models.AutentifikacijaToken", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("KorisnickiNalogId")
                        .HasColumnType("int");

                    b.Property<string>("ipAdresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vrijednost")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("vrijemeEvidentiranja")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.HasIndex("KorisnickiNalogId");

                    b.ToTable("AutentifikacijaToken");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UlogaID")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("UlogaID");

                    b.ToTable("KorisnickiNalog");

                    b.HasDiscriminator<string>("Discriminator").HasValue("KorisnickiNalog");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.Poslovnica", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrojTelefona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OpstinaID")
                        .HasColumnType("int");

                    b.Property<string>("RadnoVrijeme")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("OpstinaID");

                    b.ToTable("Poslovnica");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.Uloga", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Uloga");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.KorisnikKupon", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Iskoristen")
                        .HasColumnType("bit");

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<int>("KuponID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("KuponID");

                    b.ToTable("KorisnikKupon");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.Kupon", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Kod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaksimalniBrojKorisnika")
                        .HasColumnType("int");

                    b.Property<int>("Popust")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Kupon");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.OmiljenaStavka", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<int>("MeniStavkaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("MeniStavkaID");

                    b.ToTable("OmiljenaStavka");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.Opstina", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Opstina");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulMeni.Models.MeniGrupa", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("MeniGrupa");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulMeni.Models.MeniStavka", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<bool>("Izdvojeno")
                        .HasColumnType("bit");

                    b.Property<int>("MeniGrupaID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Ocjena")
                        .HasColumnType("real");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slika")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("SnizenaCijena")
                        .HasColumnType("real");

                    b.HasKey("ID");

                    b.HasIndex("MeniGrupaID");

                    b.ToTable("MeniStavka");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulNarudzba.Models.Narudzba", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojStavki")
                        .HasColumnType("int");

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<DateTime>("DatumNarucivanja")
                        .HasColumnType("datetime2");

                    b.Property<int>("DostavljacID")
                        .HasColumnType("int");

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<bool>("Omiljeno")
                        .HasColumnType("bit");

                    b.Property<int>("StatusNarudzbeID")
                        .HasColumnType("int");

                    b.Property<bool>("Zakljucena")
                        .HasColumnType("bit");

                    b.Property<int>("ZaposlenikID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("DostavljacID");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("StatusNarudzbeID");

                    b.HasIndex("ZaposlenikID");

                    b.ToTable("Narudzba");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulNarudzba.Models.StatusNarudzbe", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("StatusNarudzbe");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulNarudzba.Models.StavkaNarudzbe", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Iznos")
                        .HasColumnType("real");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int");

                    b.Property<int>("MeniStavkaID")
                        .HasColumnType("int");

                    b.Property<int>("NarudzbaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("MeniStavkaID");

                    b.HasIndex("NarudzbaID");

                    b.ToTable("StavkaNarudzbe");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulRezervacija.Models.Prigoda", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Prigoda");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulRezervacija.Models.Rezervacija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojOsoba")
                        .HasColumnType("int");

                    b.Property<int>("BrojStolova")
                        .HasColumnType("int");

                    b.Property<DateTime>("DatumRezerviranja")
                        .HasColumnType("datetime2");

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<bool>("Obavljena")
                        .HasColumnType("bit");

                    b.Property<string>("Poruka")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PrigodaID")
                        .HasColumnType("int");

                    b.Property<int>("StatusRezervacijeID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("PrigodaID");

                    b.HasIndex("StatusRezervacijeID");

                    b.ToTable("Rezervacija");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulRezervacija.Models.StatusRezervacije", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("StatusRezervacije");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.Administrator", b =>
                {
                    b.HasBaseType("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog");

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.HasDiscriminator().HasValue("Administrator");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", b =>
                {
                    b.HasBaseType("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog");

                    b.Property<string>("AdresaStanovanja")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrojTelefona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OpstinaID")
                        .HasColumnType("int");

                    b.HasIndex("OpstinaID");

                    b.HasDiscriminator().HasValue("Korisnik");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulZaposleni.Models.Dostavljac", b =>
                {
                    b.HasBaseType("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog");

                    b.Property<int>("DostavljeneNarudzbe")
                        .HasColumnType("int");

                    b.Property<string>("Slika")
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Dostavljac");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulZaposleni.Models.Zaposlenik", b =>
                {
                    b.HasBaseType("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog");

                    b.Property<int>("ObavljeneNarudzbe")
                        .HasColumnType("int");

                    b.Property<string>("Slika")
                        .HasColumnName("Zaposlenik_Slika")
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Zaposlenik");
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulAutentifikacija.Models.AutentifikacijaToken", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog", "korisnickiNalog")
                        .WithMany()
                        .HasForeignKey("KorisnickiNalogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.KorisnickiNalog", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnickiNalog.Models.Uloga", "Uloga")
                        .WithMany()
                        .HasForeignKey("UlogaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnickiNalog.Models.Poslovnica", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.KorisnikKupon", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Kupon", "Kupon")
                        .WithMany()
                        .HasForeignKey("KuponID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.OmiljenaStavka", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulMeni.Models.MeniStavka", "MeniStavka")
                        .WithMany()
                        .HasForeignKey("MeniStavkaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulMeni.Models.MeniStavka", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulMeni.Models.MeniGrupa", "MeniGrupa")
                        .WithMany()
                        .HasForeignKey("MeniGrupaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulNarudzba.Models.Narudzba", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulZaposleni.Models.Dostavljac", "Dostavljac")
                        .WithMany()
                        .HasForeignKey("DostavljacID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulNarudzba.Models.StatusNarudzbe", "StatusNarudzbe")
                        .WithMany()
                        .HasForeignKey("StatusNarudzbeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulZaposleni.Models.Zaposlenik", "Zaposlenik")
                        .WithMany()
                        .HasForeignKey("ZaposlenikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulNarudzba.Models.StavkaNarudzbe", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulMeni.Models.MeniStavka", "MeniStavka")
                        .WithMany()
                        .HasForeignKey("MeniStavkaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulNarudzba.Models.Narudzba", "Narudzba")
                        .WithMany()
                        .HasForeignKey("NarudzbaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulRezervacija.Models.Rezervacija", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulRezervacija.Models.Prigoda", "Prigoda")
                        .WithMany()
                        .HasForeignKey("PrigodaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FIT_Api_Examples.ModulRezervacija.Models.StatusRezervacije", "StatusRezervacije")
                        .WithMany()
                        .HasForeignKey("StatusRezervacijeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FIT_Api_Examples.ModulKorisnik.Models.Korisnik", b =>
                {
                    b.HasOne("FIT_Api_Examples.ModulKorisnik.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
