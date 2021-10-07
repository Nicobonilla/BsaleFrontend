package cl.bsale.frontend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import cl.bsale.frontend.services.CategoryImp;


@Controller
@RequestMapping("/")
public class CategoryCont {
	/*
	@Autowired
	CategoryImp serCategory;
	
	@GetMapping()
	public String index(){ //AGREGAR BUSCAR
		return "index";
	}*/
	
	/*
	@GetMapping("/")
	public String listar(ModelMap modelmap){ //AGREGAR BUSCAR
		modelmap.put("listaCategory", serCategory.lista());
		return "index";
	}*/
	
}
