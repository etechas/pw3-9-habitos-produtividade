package br.com.etecmattsam.controller;

import br.com.etecmattsam.entity.Habito;
import br.com.etecmattsam.service.HabitoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitos")
@CrossOrigin(origins = "http://localhost:4200")
public class HabitoController {

    private final HabitoService service;

    public HabitoController(HabitoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Habito> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Habito buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Habito> criar(@RequestBody Habito habito) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(habito));
    }

    @PutMapping("/{id}")
    public Habito atualizar(@PathVariable Long id, @RequestBody Habito habito) {
        return service.atualizar(id, habito);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/checkin")
    public Habito checkin(@PathVariable Long id) {
        return service.realizarCheckin(id);
    }
}
