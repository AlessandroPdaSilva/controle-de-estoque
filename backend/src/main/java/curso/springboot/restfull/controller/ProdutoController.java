package curso.springboot.restfull.controller;

import curso.springboot.restfull.model.Produto;
import curso.springboot.restfull.model.Telefone;
import curso.springboot.restfull.model.Usuario;
import curso.springboot.restfull.model.UsuarioDto;
import curso.springboot.restfull.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // LISTAR PRODUTOS
    @GetMapping(value = "")
    @CacheEvict(value = "cachelistaproduto", allEntries = true)// limpa cache nao usado
    @CachePut("cachelistaproduto")// atualiza lista de cache
    public ResponseEntity listarProduto(){

        PageRequest page = PageRequest.of(0, 5, Sort.by("nome"));

        Page<Produto> listaProduto = produtoRepository.findAll(page);

        return new ResponseEntity<Page<Produto>>(listaProduto, HttpStatus.OK);
    }

    // LISTAR PRODUTOS PAGINACAO
    @GetMapping(value = "page/{pagina}")
    @CacheEvict(value = "cachelistaproduto", allEntries = true)// limpa cache nao usado
    @CachePut("cachelistaproduto")// atualiza lista de cache
    public ResponseEntity listarProdutoPaginacao(@PathVariable(value = "pagina") int pagina){

        PageRequest page = PageRequest.of(pagina, 5, Sort.by("nome"));

        Page<Produto> listaProduto = produtoRepository.findAll(page);

        return new ResponseEntity<Page<Produto>>(listaProduto,HttpStatus.OK);
    }


    // CONSULTAR PRODUTO BY NOME
    @GetMapping(value = "/consultaByNome/{nome}")
    public ResponseEntity consultarProdutoByNome(@PathVariable(value = "nome") String nome){

        List<Produto> listaProduto = produtoRepository.findProdutoByNome(nome);

        return new ResponseEntity<List<Produto>>(listaProduto,HttpStatus.OK);
    }

    // CONSULTAR PRODUTO
    @GetMapping(value = "/{id}")
    public ResponseEntity consultarUsuario(@PathVariable(value = "id") Long id){

        Produto p = produtoRepository.findById(id).get();

        return new ResponseEntity<Produto>(p,HttpStatus.OK);
    }



    // SALVAR PRODUTO
    @PostMapping(value = "")
    public ResponseEntity<?> salvarProduto(@RequestBody Produto produto){

        // Salvando Usuario
        produto = produtoRepository.save(produto);

        return new ResponseEntity<Produto>(produto, HttpStatus.CREATED);
    }


    // EDITAR PRODUTO
    @PutMapping(value = "")
    public ResponseEntity<?> editarProduto(@RequestBody Produto produto){


        if(produto.getId() == null) {
            return new ResponseEntity<String>("Id do produto não informado", HttpStatus.OK);
        }

        // Salvando Produto
        produto = produtoRepository.save(produto);

        return new ResponseEntity<Produto>(produto, HttpStatus.OK);
    }


    // DELETAR PRODUTO
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable(value = "id") Long id){

        produtoRepository.deleteById(id);

        return new ResponseEntity<String>("Deletado com sucesso",HttpStatus.OK);
    }


}
