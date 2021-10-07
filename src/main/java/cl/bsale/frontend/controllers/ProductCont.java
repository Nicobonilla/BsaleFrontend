package cl.bsale.frontend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cl.bsale.frontend.services.ProductImp;

@Controller
@RequestMapping("/")
public class ProductCont {

	@Autowired
	ProductImp servServ;
	
	@GetMapping
	public String index(){ //AGREGAR BUSCAR
		return "index";
	}
	
	/*
	@GetMapping
	public String lista(ModelMap modelmap){ //AGREGAR BUSCAR
		modelmap.put("listaUsuarios", servServ.lista());
		return "index";
	}
	*/
	/*@GetMapping("/buscar")
	public String buscarUsuario(@RequestParam("id") Integer id, ModelMap mostrarRut) {
		System.out.println("pasamos por aqui");
		mostrarRut.put("Usuario", servServ.buscarPorId(id));
		return "mostrarUsuario";
	}*/
	
}
