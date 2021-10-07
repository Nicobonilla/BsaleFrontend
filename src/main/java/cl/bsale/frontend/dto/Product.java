package cl.bsale.frontend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Product {
	
	private Integer id;
	private String name;
	private String urlImage;
	private Float price;
	private Integer discount;
	private Integer category;

}
