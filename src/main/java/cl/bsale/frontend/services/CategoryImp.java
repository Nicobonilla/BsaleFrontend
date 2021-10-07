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

import cl.bsale.frontend.dto.Category;

@Service
public class CategoryImp implements GenericServiceInterface<Category>{

	private static final String APICATEGORY = "http://localhost:9002/api/v1/category";
	private static final String APIBUSCARPORID = "http://localhost:9002/api/v1/category/buscar/{id}";
	
	@Autowired
	RestTemplate consumeApi;
	
	@Override
	public List<Category> lista() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<Category> entityUsuario = new HttpEntity<Category>(headers);
		ResponseEntity<List<Category>> responseUsuarios = consumeApi.exchange(APICATEGORY, HttpMethod.GET, entityUsuario, new ParameterizedTypeReference<List<Category>>() {
		});
		return responseUsuarios.getBody();
	}

	@Override
	public Category buscarPorId(Integer id) {
		Map<String, Integer> maparid = new HashMap<String, Integer>();
		maparid.put("id", id);
		ResponseEntity<Category> responseUsuario = consumeApi.getForEntity(APIBUSCARPORID, Category.class, maparid);
		return responseUsuario.getBody();
	}
}
