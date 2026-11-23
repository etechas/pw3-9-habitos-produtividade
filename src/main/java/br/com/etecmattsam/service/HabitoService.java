package br.com.etecmattsam.service;

import br.com.etecmattsam.entity.Habito;
import br.com.etecmattsam.repository.HabitoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class HabitoService {

    private final HabitoRepository repository;

    public HabitoService(HabitoRepository repository) {
        this.repository = repository;
    }

    public List<Habito> listar() {
        return repository.findAll();
    }

    public Habito buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Hábito não encontrado (id " + id + ")."));
    }

    public Habito criar(Habito habito) {
        habito.setId(null);
        habito.setDiasConsecutivos(0);
        habito.setConquistaAlcancada(false);
        return repository.save(habito);
    }

    // Edita somente descrição e meta
    public Habito atualizar(Long id, Habito dados) {
        Habito habito = buscarPorId(id);
        habito.setDescricao(dados.getDescricao());
        habito.setMetaDias(dados.getMetaDias());
        return repository.save(habito);
    }

    public void excluir(Long id) {
        Habito habito = buscarPorId(id);
        repository.delete(habito);
    }

    // Regra de negócio: check-in diário e conquista
    public Habito realizarCheckin(Long habitoId) {
        Habito habito = buscarPorId(habitoId);

        habito.setDiasConsecutivos(habito.getDiasConsecutivos() + 1);

        if (habito.getDiasConsecutivos() >= habito.getMetaDias()) {
            habito.setConquistaAlcancada(true);
        }

        return repository.save(habito);
    }
}
