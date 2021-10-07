package cl.bsale.frontend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import cl.bsale.frontend.dto.Product;

@Service
public class ProductImp implements GenericServiceInterface<Product> {

	private static final String APIPRODUCT = "http://localhost:9002/api/v1/product";
	private static final String APIBUSCARPORID = "http://localhost:9002/api/v1/product/buscar/{id}";
	
	@Autowired
	RestTemplate consumeApi;
	
	@Override
	public List<Product> lista() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<Product> entityUsuario = new HttpEntity<Product>(headers);
		ResponseEntity<List<Product>> responseUsuarios = consumeApi.exchange(APIPRODUCT, HttpMethod.GET, entityUsuario, new ParameterizedTypeReference<List<Product>>() {
		});
		return responseUsuarios.getBody();
	}

	@Override
	public Product buscarPorId(Integer id) {
		Map<String, Integer> maparid = new HashMap<String, Integer>();
		maparid.put("id", id);
		ResponseEntity<Product> responseUsuario = consumeApi.getForEntity(APIBUSCARPORID, Product.class, maparid);
		return responseUsuario.getBody();
	}

}
