package cl.bsale.frontend.services;

import java.util.List;

public interface GenericServiceInterface<E> {
	public List<E> lista();
	public E buscarPorId(Integer id);
}
