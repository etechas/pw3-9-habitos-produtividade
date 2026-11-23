package br.com.etecmattsam.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TBL_HABITO")
@Getter
@Setter
@NoArgsConstructor
public class Habito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hab")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "diasConsecutivos")
    private Integer diasConsecutivos;

    @Column(name = "metaDias")
    private Integer metaDias;

    @Column(name = "conquistaAlcancada")
    private boolean conquistaAlcancada;
}
