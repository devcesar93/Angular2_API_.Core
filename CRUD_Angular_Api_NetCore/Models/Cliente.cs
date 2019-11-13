using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstudoAngular.Models
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        public int idCliente { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [StringLength(100)]
        public string Sobrenome { get; set; }

        public DateTime DataNascimento { get; set; }

        [Required]
        [StringLength(1)]
        public string Sexo { get; set; }

        [Required]
        [StringLength(20)]
        public string CPF { get; set; }

        [Required]
        [StringLength(50)]
        public string Telefone { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(250)]
        public string Email { get; set; }
    }
}
