package curso.springboot.restfull.repository;

import curso.springboot.restfull.model.Produto;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p WHERE p.nome LIKE %?1%")
    public List<Produto> findProdutoByNome(String nome);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE produto SET quantidade = ?1 WHERE id = ?2")
    public void updateQuantidade(int quantidade, Long idProduto);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE produto SET nome = ?1 WHERE id = ?2")
    public void updateNome(int nome, Long idProduto);

    // paginacao para consulta de nome
    default Page<Produto> findProdutoByNamePage(String nome, PageRequest pageRequest) {

        Produto produto = new Produto();
        produto.setNome(nome);

        /*Configurando para pesquisar por nome e paginação*/
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAny()
                .withMatcher("nome", ExampleMatcher.GenericPropertyMatchers
                        .contains().ignoreCase());

        Example<Produto> example = Example.of(produto, exampleMatcher);

        Page<Produto> retorno = findAll(example, pageRequest);

        return retorno;

    }
}
